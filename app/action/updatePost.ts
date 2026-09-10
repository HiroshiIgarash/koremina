"use server";

import prisma from "@/lib/db";
import { updateTag } from "next/cache";
import { z } from "zod";
import getCurrentUser from "./getCurrentUser";
import { postInputSchema } from "./schema/postInput";

const updatePostInputSchema = postInputSchema.extend({
  postId: z.string().min(1),
});

export type UpdatePostResult =
  { ok: true; postId: string } | { ok: false; error: string };

/**
 * 既存の投稿を更新する
 *
 * createPost と同じ理由で Server Action にしている（updateTag を使うため）。
 */
const updatePost = async (
  input: z.infer<typeof updatePostInputSchema>
): Promise<UpdatePostResult> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { ok: false, error: "ログインが必要です。" };
  }

  const parsed = updatePostInputSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "入力内容に誤りがあります。" };
  }

  const {
    postId,
    videoId,
    comment,
    detailComment,
    liver: liversId,
  } = parsed.data;

  const existingPost = await prisma.video.findUnique({
    where: { id: postId },
    select: { postedUserId: true },
  });

  if (!existingPost) {
    return { ok: false, error: "投稿が見つかりません。" };
  }

  if (existingPost.postedUserId !== currentUser.id) {
    return { ok: false, error: "この投稿を編集する権限がありません。" };
  }

  await prisma.video.update({
    where: {
      id: postId,
    },
    data: {
      videoId,
      comment,
      detailComment,
      liver: {
        set: liversId.map(id => ({ id })),
      },
    },
  });

  updateTag("get-post");
  updateTag(`get-post-by-id:${postId}`);

  return { ok: true, postId };
};

export default updatePost;
