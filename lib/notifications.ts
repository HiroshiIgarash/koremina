"use server";

import prisma from "@/lib/db";
import {
  generateVerificationToken,
  hashToken,
  getTokenExpiry,
  isTokenExpired,
  isRateLimited,
  shouldResetRateLimit,
} from "@/lib/verification";
import { sendVerificationEmail } from "@/lib/email";

/**
 * サービス層のレスポンス型
 */
export type NotificationServiceResult =
  | { success: true; message: string; requiresVerification?: boolean }
  | { success: false; error: string; code?: string };

/**
 * 通知メールアドレスを登録/更新（ダブルオプトインフロー）
 *
 * ロジック:
 * 1. session.user.email と一致 → 即座に verified
 * 2. それ以外 → 確認メール送信
 *
 * @param userId ユーザーID
 * @param email 通知用メールアドレス
 * @param sessionEmail セッションのメールアドレス
 * @returns 処理結果
 */
export async function subscribeNotificationEmail(
  userId: string,
  email: string,
  sessionEmail: string | null | undefined
): Promise<NotificationServiceResult> {
  try {
    const trimmedEmail = email.trim().toLowerCase();

    // 空文字列の場合は削除処理
    if (trimmedEmail === "") {
      return await unsubscribeNotificationEmail(userId);
    }

    // セッションのメールと完全一致する場合は即座に verified
    if (sessionEmail && trimmedEmail === sessionEmail.toLowerCase()) {
      console.log(
        `[subscribeNotificationEmail] セッションメールと一致: ${userId}`
      );

      await prisma.user.update({
        where: { id: userId },
        data: {
          notificationEmail: trimmedEmail,
          notificationEmailVerified: true,
          notificationEmailTokenHash: null,
          notificationEmailTokenExpires: null,
          notificationEmailSendAttempts: 0,
          notificationEmailLastSentAt: null,
        },
      });

      return {
        success: true,
        message: "通知用メールアドレスを設定しました",
        requiresVerification: false,
      };
    }

    // レート制限チェック
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        notificationEmailSendAttempts: true,
        notificationEmailLastSentAt: true,
      },
    });

    if (!user) {
      console.error(
        `[subscribeNotificationEmail] ユーザーが見つかりません: ${userId}`
      );
      return {
        success: false,
        error: "ユーザーが見つかりません",
        code: "USER_NOT_FOUND",
      };
    }

    // レート制限を超えている場合
    if (
      isRateLimited(
        user.notificationEmailSendAttempts,
        user.notificationEmailLastSentAt
      )
    ) {
      console.warn(
        `[subscribeNotificationEmail] レート制限: userId=${userId}, email=${trimmedEmail}`
      );

      // メール列挙攻撃を防ぐため、成功メッセージを返す
      return {
        success: true,
        message:
          "確認メールを送信しました。メールボックスをご確認ください",
        requiresVerification: true,
      };
    }

    // トークン生成とハッシュ化
    const rawToken = generateVerificationToken();
    const tokenHash = hashToken(rawToken);
    const tokenExpiry = getTokenExpiry();

    // レート制限カウンターの更新
    const shouldReset = shouldResetRateLimit(
      user.notificationEmailLastSentAt
    );
    const newAttempts = shouldReset
      ? 1
      : user.notificationEmailSendAttempts + 1;

    // DBに保存（ハッシュのみ）
    await prisma.user.update({
      where: { id: userId },
      data: {
        notificationEmail: trimmedEmail,
        notificationEmailVerified: false,
        notificationEmailTokenHash: tokenHash,
        notificationEmailTokenExpires: tokenExpiry,
        notificationEmailSendAttempts: newAttempts,
        notificationEmailLastSentAt: new Date(),
      },
    });

    // 確認メール送信（非同期、エラーでも握りつぶす）
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const confirmUrl = `${baseUrl}/api/notifications/confirm?token=${rawToken}&userId=${userId}`;

    try {
      await sendVerificationEmail(trimmedEmail, confirmUrl);
      console.log(
        `[subscribeNotificationEmail] 確認メール送信成功: ${trimmedEmail}`
      );
    } catch (emailError) {
      console.error(
        `[subscribeNotificationEmail] メール送信エラー: ${trimmedEmail}`,
        emailError
      );
      // メール送信失敗でもトークンは保存されているので成功として扱う
    }

    // メール列挙攻撃を防ぐため、常に成功メッセージ
    return {
      success: true,
      message:
        "確認メールを送信しました。メールボックスをご確認ください",
      requiresVerification: true,
    };
  } catch (error) {
    console.error("[subscribeNotificationEmail] エラー:", error);
    return {
      success: false,
      error: "メールアドレスの登録に失敗しました",
      code: "INTERNAL_ERROR",
    };
  }
}

/**
 * 確認トークンを検証してメールアドレスを有効化
 *
 * @param userId ユーザーID
 * @param token 生トークン
 * @returns 処理結果
 */
export async function confirmNotificationEmail(
  userId: string,
  token: string
): Promise<NotificationServiceResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        notificationEmailTokenHash: true,
        notificationEmailTokenExpires: true,
        notificationEmailVerified: true,
      },
    });

    if (!user) {
      console.error(
        `[confirmNotificationEmail] ユーザーが見つかりません: ${userId}`
      );
      return {
        success: false,
        error: "無効なリンクです",
        code: "INVALID_LINK",
      };
    }

    // すでに検証済みの場合（idempotent）
    if (user.notificationEmailVerified) {
      console.log(
        `[confirmNotificationEmail] すでに検証済み: ${userId}`
      );
      return {
        success: true,
        message: "このメールアドレスはすでに確認済みです",
      };
    }

    // トークンがない場合
    if (!user.notificationEmailTokenHash) {
      console.warn(
        `[confirmNotificationEmail] トークンが存在しません: ${userId}`
      );
      return {
        success: false,
        error: "無効なリンクです",
        code: "INVALID_LINK",
      };
    }

    // 有効期限チェック
    if (isTokenExpired(user.notificationEmailTokenExpires)) {
      console.warn(
        `[confirmNotificationEmail] トークン期限切れ: ${userId}`
      );
      return {
        success: false,
        error: "確認リンクの有効期限が切れています",
        code: "TOKEN_EXPIRED",
      };
    }

    // トークンハッシュを比較
    const tokenHash = hashToken(token);
    if (tokenHash !== user.notificationEmailTokenHash) {
      console.warn(
        `[confirmNotificationEmail] トークンが一致しません: ${userId}`
      );
      return {
        success: false,
        error: "無効なリンクです",
        code: "INVALID_TOKEN",
      };
    }

    // 検証成功 → トークンをクリアして verified にする
    await prisma.user.update({
      where: { id: userId },
      data: {
        notificationEmailVerified: true,
        notificationEmailTokenHash: null,
        notificationEmailTokenExpires: null,
      },
    });

    console.log(`[confirmNotificationEmail] メール検証成功: ${userId}`);

    return {
      success: true,
      message: "メールアドレスの確認が完了しました",
    };
  } catch (error) {
    console.error("[confirmNotificationEmail] エラー:", error);
    return {
      success: false,
      error: "メールアドレスの確認に失敗しました",
      code: "INTERNAL_ERROR",
    };
  }
}

/**
 * 通知メールアドレスを削除（配信停止）
 *
 * @param userId ユーザーID
 * @returns 処理結果
 */
export async function unsubscribeNotificationEmail(
  userId: string
): Promise<NotificationServiceResult> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        notificationEmail: null,
        notificationEmailVerified: false,
        notificationEmailTokenHash: null,
        notificationEmailTokenExpires: null,
        notificationEmailSendAttempts: 0,
        notificationEmailLastSentAt: null,
      },
    });

    console.log(`[unsubscribeNotificationEmail] 配信停止: ${userId}`);

    return {
      success: true,
      message: "通知用メールアドレスを削除しました",
    };
  } catch (error) {
    console.error("[unsubscribeNotificationEmail] エラー:", error);
    return {
      success: false,
      error: "メールアドレスの削除に失敗しました",
      code: "INTERNAL_ERROR",
    };
  }
}
