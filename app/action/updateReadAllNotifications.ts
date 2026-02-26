"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
const updateReadAllNotifications = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  revalidateTag(`get-notifications-${session.user.id}`, "seconds");
};

export default updateReadAllNotifications;
