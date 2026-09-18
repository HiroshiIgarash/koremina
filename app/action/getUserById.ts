import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getUserById = async (id: string) => {
  "use cache";
  cacheTag(`get-user:${id}`);
  cacheLife("max");

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
