import prisma from "@/lib/db";
import { cacheTag } from "next/cache";
import { cacheLife } from "next/cache";

const getPostById = async (id: string) => {
  // インメモリの "use cache" はインスタンスが入れ替わるたびに消えて DB を起こすため、共有キャッシュに置く
  "use cache: remote";
  cacheTag(`get-post-by-id:${id}`);
  cacheLife("max");

  const post = await prisma.video.findUnique({
    where: {
      id,
    },
    include: {
      postedUser: true,
      liver: true,
    },
  });

  return post;
};

export default getPostById;
