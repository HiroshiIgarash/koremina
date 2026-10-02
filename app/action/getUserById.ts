import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getUserById = async (id: string) => {
  // インメモリの "use cache" はインスタンスが入れ替わるたびに消えて DB を起こすため、共有キャッシュに置く
  "use cache: remote";
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
