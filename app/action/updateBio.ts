"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { BioSchema, bioSchema } from "@/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";

const updateBio = async (bio: BioSchema) => {
  try {
    const session = await auth();

    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return {
        error: "Unauthorized",
      };
    }

    const newBio = bio.newBio;
    bioSchema.parse({ newBio });

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        bio: newBio || null, // 空文字の場合はnullに設定
      },
    });

    revalidateTag("get-current-user");

    // ユーザーが投稿した投稿IDを取得し、それぞれの投稿キャッシュを再検証
    const userPosts = await prisma.video.findMany({
      where: { postedUserId: currentUserId },
      select: { id: true },
    });
    userPosts.forEach(post => {
      revalidateTag(`get-post-by-id:${post.id}`);
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { error: { bio: "bio is invalid" } };
    }
    return {
      error: "Failed to update bio",
    };
  }
};

export default updateBio;