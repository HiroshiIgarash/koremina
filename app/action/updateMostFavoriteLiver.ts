"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

const updateMostFavoriteLiver = async (data: {
  liverId?: string | undefined;
}) => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const { liverId } = data;

    const updateData = liverId
      ? {
          mostFavoriteLiver: {
            connect: {
              id: liverId,
            },
          },
        }
      : {
          mostFavoriteLiverId: null,
        };

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: updateData,
      include: {
        mostFavoriteLiver: true,
      },
    });
  } catch (error) {
    console.error("[updateMostFavoriteLiver] エラー:", error);
    return {
      error: "Failed to update most favorite liver",
    };
  }

  revalidateTag(`get-user:${session.user.id}`, "hours");
};

export default updateMostFavoriteLiver;
