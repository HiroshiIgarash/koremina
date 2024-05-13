"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { revalidatePath } from "next/cache";

const updateBookmark = async (postId: string, active: boolean) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return "Unauthorized";
  }

  const bookmark = active
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

  revalidatePath("/");
  return bookmark;
};

export default updateBookmark;
