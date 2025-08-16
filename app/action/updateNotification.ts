"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { NotificationType } from "@/types/type";
import { revalidateTag } from "next/cache";

interface updateNotificationProps {
  type: NotificationType;
  postId: string;
}

const updateNotification = async ({
  type,
  postId,
}: updateNotificationProps) => {
  let postedUserId = "";

  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const post = await prisma.video.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error("Invalid data");
    }

    const existingNotification = await prisma.notification.findFirst({
      where: {
        type,
        userId: post.postedUserId,
        postId,
      },
    });

    await prisma.notification.upsert({
      where: {
        id: existingNotification?.id || "",
      },
      update: {
        isRead: false,
        createdAt: new Date(),
      },
      create: {
        type,
        userId: post.postedUserId,
        postId,
      },
    });

    postedUserId = post.postedUserId;
  } catch (error) {
    console.log(error);
  }

  revalidateTag(`get-notifications-${postedUserId}`);
};

export default updateNotification;
