"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { revalidateTag } from "next/cache";

const updateBookmark = async (postId: string, type: "CONNECT" | "DISCONNECT") => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return "Unauthorized";
  }

  const bookmark = type === "DISCONNECT"
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

  revalidateTag('get-post')
  return bookmark;
};

export default updateBookmark;
