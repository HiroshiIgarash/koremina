"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { unstable_cache } from "next/cache";

const getCurrentUserWithTag = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const getCurrentUser = unstable_cache(
    async session => {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        include: {
          mostFavoriteLiver: true,
          favoriteLivers: true,
        },
      });

      return user;
    },
    [],
    { tags: ["get-current-user"], revalidate: 1 }
  );

  return await getCurrentUser(session);
};

export default getCurrentUserWithTag;
