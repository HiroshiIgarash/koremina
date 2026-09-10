"use server";

import prisma from "@/lib/db";
import { updateTag } from "next/cache";
import { z } from "zod";
import getCurrentUser from "./getCurrentUser";
import { sendNewPostEmails } from "@/lib/email";
import { postInputSchema } from "./schema/postInput";

export type CreatePostResult =
  { ok: true; postId: string } | { ok: false; error: string };

/**
 * 投稿を新規作成する
 *
 * Route Handler ではなく Server Action にしているのは、投稿者本人が投稿直後に
 * 一覧を見たときに自分の投稿が載っている必要があるため。即時にキャッシュを
 * 無効化する updateTag は Server Action でしか使えない。
 */
const createPost = async (
  input: z.infer<typeof postInputSchema>
): Promise<CreatePostResult> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { ok: false, error: "ログインが必要です。" };
  }

  const parsed = postInputSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "入力内容に誤りがあります。" };
  }

  const { videoId, comment, detailComment, liver: liversId } = parsed.data;

  const newPost = await prisma.video.create({
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id,
        },
      },
      liver: {
        connect: liversId.map(id => ({ id })),
      },
    },
  });

  // getUserPosts / getTotalUserPosts にも get-post タグを張ってあるため、
  // ここで get-post を無効化すればユーザーページの一覧も一緒に更新される
  updateTag("get-post");

  // 新規投稿のメール通知を非同期で送信（awaitしない）
  sendNewPostEmails(newPost.id).catch(err => {
    console.error("メール送信エラー:", err);
  });

  return { ok: true, postId: newPost.id };
};

export default createPost;
