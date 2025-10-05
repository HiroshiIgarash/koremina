"use server";

import { auth } from "@/auth";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { subscribeNotificationEmail } from "@/lib/notifications";

// メールアドレスのバリデーションスキーマ（空文字列またはメールアドレス）
const emailSchema = z
  .string()
  .refine(
    val => val === "" || z.string().email().safeParse(val).success,
    "有効なメールアドレスを入力してください"
  );

/**
 * 通知用メールアドレスを更新（ダブルオプトイン対応）
 */
const updateNotificationEmail = async (email: string) => {
  try {
    const session = await auth();

    const currentUserId = session?.user?.id;
    const sessionEmail = session?.user?.email;

    if (!currentUserId) {
      return {
        error: "認証が必要です",
      };
    }

    const trimmedEmail = email.trim();

    // メールアドレスのバリデーション
    emailSchema.parse(trimmedEmail);

    // サービス層を呼び出し
    const result = await subscribeNotificationEmail(
      currentUserId,
      trimmedEmail,
      sessionEmail
    );

    if (!result.success) {
      return { error: result.error };
    }

    revalidateTag("get-current-user");

    return {
      success: true,
      message: result.message,
      requiresVerification: result.requiresVerification,
    };
  } catch (error) {
    console.error("[updateNotificationEmail] エラー:", error);

    if (error instanceof z.ZodError) {
      return { error: "有効なメールアドレスを入力してください" };
    }

    return {
      error: "メールアドレスの更新に失敗しました",
    };
  }
};

export default updateNotificationEmail;
