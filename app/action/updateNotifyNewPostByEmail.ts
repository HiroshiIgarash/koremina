"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

/**
 * 新規投稿メール通知設定を更新
 */
const updateNotifyNewPostByEmail = async (enabled: boolean) => {
  try {
    const session = await auth();

    const currentUserId = session?.user?.id;

    if (!currentUserId) {
      return {
        error: "Unauthorized",
      };
    }

    if (typeof enabled !== "boolean") {
      return {
        error: "Invalid data",
      };
    }

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        notifyNewPostByEmail: enabled,
      },
    });

    revalidateTag("get-current-user");

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update notification settings",
    };
  }
};

export default updateNotifyNewPostByEmail;
