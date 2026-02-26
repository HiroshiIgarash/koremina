import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getUserById = async (id: string) => {
  "use cache";
  cacheTag(`get-user:${id}`);
  cacheLife("hours");

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      mostFavoriteLiver: true,
      favoriteLivers: true,
    },
  });

  return user;
};

export default getUserById;
