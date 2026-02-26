"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

const updateFavoriteLivers = async (liversId: string[]) => {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  if (
    !Array.isArray(liversId) ||
    liversId.length > 500 ||
    !liversId.every(id => typeof id === "string")
  ) {
    return { error: "Invalid data" };
  }

  try {
    const updateData = liversId.map(liverId => ({ id: liverId }));

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        favoriteLivers: {
          set: updateData,
        },
      },
    });
  } catch (error) {
    console.error("[updateFavoriteLivers] エラー:", error);
    return {
      error: "Failed to update favorite livers",
    };
  }

  revalidateTag(`get-user:${session.user.id}`, "hours");
};

export default updateFavoriteLivers;
