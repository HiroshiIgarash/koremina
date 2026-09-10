"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { updateTag } from "next/cache";

const updateBookmark = async (
  postId: string,
  type: "CONNECT" | "DISCONNECT"
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return "Unauthorized";
  }

  const bookmark =
    type === "DISCONNECT"
      ? await prisma.bookmark.delete({
          where: {
            userId_postId: {
              postId,
              userId: currentUser.id,
            },
          },
        })
      : await prisma.bookmark.upsert({
          where: {
            userId_postId: {
              userId: currentUser.id,
              postId,
            },
          },
          create: {
            userId: currentUser.id,
            postId,
          },
          update: {},
        });

  // 投稿一覧が持つ _count.Bookmark も変わるため get-post も無効化する
  updateTag("get-post");
  updateTag(`bookmark-info:${postId}`);
  updateTag(`bookmark:${currentUser.id}`);

  return bookmark;
};

export default updateBookmark;
