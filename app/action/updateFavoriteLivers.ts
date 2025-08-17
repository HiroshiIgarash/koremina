"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

const updateFavoriteLivers = async (liversId: string[]) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

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
    console.log(error);
    return {
      error: "Failed to update favorite livers",
    };
  }

  revalidateTag("get-current-user");
};

export default updateFavoriteLivers;
