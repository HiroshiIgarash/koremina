"use server";

import nodemailer from "nodemailer";

const sendReportMail = async (postId: string) => {
  const user = process.env.MAILER_USER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MAILER_USER, // Gmailアドレス
      pass: process.env.MAILER_PASS, // Googleアプリパスワード（16文字）
    },
  });

  await transporter.sendMail({
    from: user,
    to: user,
    subject: "【コレミナ】投稿が通報されました。",
    text: `https://koremina.vercel.app/post/${postId} の投稿が通報されました。`,
  });
};

export default sendReportMail;
