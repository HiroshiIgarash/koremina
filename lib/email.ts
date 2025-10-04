import nodemailer from "nodemailer";
import prisma from "@/lib/db";
import type { Video } from "@prisma/client";

// Gmail SMTP設定
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_USER, // Gmailアドレス
    pass: process.env.MAILER_PASS, // Googleアプリパスワード（16文字）
  },
});

/**
 * 新規投稿時に全ユーザー（投稿者以外 & メール通知ON）にメール送信
 */
export const sendNewPostEmails = async (postId: string) => {
  try {
    // 投稿情報を取得
    const post = await prisma.video.findUnique({
      where: { id: postId },
      include: { postedUser: true },
    });

    if (!post) {
      console.error("投稿が見つかりません:", postId);
      return;
    }

    // 通知対象ユーザーを取得（投稿者以外 & メール通知ON & 通知用メールアドレスあり）
    const targetUsers = await prisma.user.findMany({
      where: {
        id: { not: post.postedUserId }, // 投稿者以外
        notifyNewPostByEmail: true, // メール通知ON
        notificationEmail: { not: null }, // 通知用メールアドレスあり
      },
    });

    if (targetUsers.length === 0) {
      console.log("メール送信対象ユーザーがいません");
      return;
    }

    console.log(`${targetUsers.length}人にメール送信開始`);

    // 各ユーザーにメール送信（リトライ付き）
    const results = await Promise.allSettled(
      targetUsers.map(user => sendEmailWithRetry(user.notificationEmail!, post))
    );

    // 結果を集計
    const succeeded = results.filter(r => r.status === "fulfilled").length;
    const failed = results.filter(r => r.status === "rejected").length;

    console.log(
      `メール送信完了: 成功=${succeeded}, 失敗=${failed}, 合計=${targetUsers.length}`
    );

    // 失敗をログに記録
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `メール送信最終失敗: ${targetUsers[index].notificationEmail}`,
          result.reason
        );
      }
    });
  } catch (error) {
    console.error("sendNewPostEmails エラー:", error);
  }
};

/**
 * メール送信（3回までリトライ）
 */
const sendEmailWithRetry = async (
  email: string,
  post: Video,
  retryCount = 0
): Promise<void> => {
  const MAX_RETRIES = 3;
  const BACKOFF_MS = [0, 2000, 5000]; // 即座、2秒後、5秒後

  try {
    await transporter.sendMail({
      from: `"コレミナ" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "【コレミナ】新しい投稿があります",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
              <h2 style="color: #333; margin-top: 0;">新しい投稿がありました</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                「${post.comment}」
              </p>
              ${
                post.detailComment
                  ? `<p style="color: #888; font-size: 14px; line-height: 1.6;">${post.detailComment}</p>`
                  : ""
              }
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://koremina.vercel.app"}/post/${post.id}"
                 style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 6px;">
                投稿を見る
              </a>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">
                このメールは コレミナ からの新規投稿通知です。<br>
                通知設定は<a href="${process.env.NEXT_PUBLIC_BASE_URL || "https://koremina.vercel.app"}/setting">こちら</a>から変更できます。
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`メール送信成功: ${email}`);
  } catch (error) {
    console.error(`メール送信失敗 (${retryCount + 1}回目): ${email}`, error);

    if (retryCount < MAX_RETRIES) {
      // リトライ
      await new Promise(resolve => setTimeout(resolve, BACKOFF_MS[retryCount]));
      return sendEmailWithRetry(email, post, retryCount + 1);
    } else {
      // 最終失敗
      throw error;
    }
  }
};
