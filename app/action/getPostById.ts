import prisma from "@/lib/db";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { unstable_cacheLife as cacheLife } from "next/cache";

const getPostById = async (id: string) => {
  "use cache";
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
