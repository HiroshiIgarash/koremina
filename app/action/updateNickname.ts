"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { NicknameSchema, nicknameSchema } from "@/schema";
import { z } from "zod";
import { revalidateTag } from "next/cache";

const updateNickname = async (name: NicknameSchema) => {
  try {
    const session = await auth();

    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return {
        error: "Unauthorized",
      };
    }

    const newNickname = name.newNickname;
    nicknameSchema.parse({ newNickname });

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        nickname: newNickname,
      },
    });

    revalidateTag("get-current-user");

    // ユーザーが投稿した投稿IDを取得し、それぞれの投稿キャッシュを再検証
    const userPosts = await prisma.video.findMany({
      where: { postedUserId: currentUserId },
      select: { id: true },
    });
    userPosts.forEach((post) => {
      revalidateTag(`get-post-by-id:${post.id}`);
    });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return { error: { username: "username is invalid" } };
    }
    return {
      error: "Failed to update nickname",
    };
  }
};

export default updateNickname;
