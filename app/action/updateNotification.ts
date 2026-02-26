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

    // 自分の投稿への操作は通知しない
    if (user.id === post.postedUserId) {
      return;
    }

    // 同一タイプ・同一投稿の既存通知を検索し、あれば未読に戻す／なければ新規作成
    const existingNotification = await prisma.notification.findFirst({
      where: {
        type,
        userId: post.postedUserId,
        postId,
      },
    });

    if (existingNotification) {
      await prisma.notification.update({
        where: { id: existingNotification.id },
        data: {
          isRead: false,
          createdAt: new Date(),
        },
      });
    } else {
      await prisma.notification.create({
        data: {
          type,
          userId: post.postedUserId,
          postId,
        },
      });
    }

    // upsert成功後にキャッシュを無効化（tryブロック内で実行し、エラー時の空タグrevalidateを防ぐ）
    revalidateTag(`get-notifications-${post.postedUserId}`, "seconds");
  } catch (error) {
    console.error("[updateNotification] エラー:", error);
  }
};

export default updateNotification;
