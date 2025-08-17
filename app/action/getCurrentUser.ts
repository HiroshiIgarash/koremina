"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

const getCurrentUser = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

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
};

export default getCurrentUser;
