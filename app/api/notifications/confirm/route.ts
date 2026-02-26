import { NextRequest, NextResponse } from "next/server";
import { confirmNotificationEmail } from "@/lib/notifications";

/**
 * メール確認リンクのハンドラー（セッション不要の公開エンドポイント）
 *
 * クエリパラメータ:
 * - token: 検証トークン（生トークン）
 * - userId: ユーザーID
 *
 * 処理後、結果に応じたページにリダイレクト:
 * - 成功 → /notifications/confirmed
 * - 期限切れ → /notifications/expired
 * - 無効 → /notifications/invalid
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  // パラメータ検証
  if (!token || !userId) {
    console.warn("[GET /api/notifications/confirm] パラメータ不足");
    return NextResponse.redirect(
      new URL("/notifications/invalid", request.url)
    );
  }

  // トークン確認処理
  const result = await confirmNotificationEmail(userId, token);

  if (!result.success) {
    console.warn(
      `[GET /api/notifications/confirm] 確認失敗: code=${result.code}`
    );

    // エラーコードに応じてリダイレクト先を変更
    if (result.code === "TOKEN_EXPIRED") {
      return NextResponse.redirect(
        new URL("/notifications/expired", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/notifications/invalid", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/notifications/confirmed", request.url)
  );
}
