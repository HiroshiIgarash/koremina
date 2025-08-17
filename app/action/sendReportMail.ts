"use server";

import nodemailer from "nodemailer";

const sendReportMail = async (postId: string) => {
  const host = process.env.MAILER_HOST;
  const user = process.env.MAILER_USER;
  const pass = process.env.MAILER_PASS;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host,
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to: user,
    subject: "【コレミナ】投稿が通報されました。",
    text: `https://koremina.vercel.app/post/${postId} の投稿が通報されました。`,
  });
};

export default sendReportMail;
