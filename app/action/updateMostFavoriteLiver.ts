"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

const updateMostFavoriteLiver = async (data: {
  liverId?: string | undefined;
}) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        error: "Unauthorized",
      };
    }

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
    console.log(error);
    return {
      error: "Failed to update most favorite liver",
    };
  }

  revalidateTag("get-current-user");
};

export default updateMostFavoriteLiver;
