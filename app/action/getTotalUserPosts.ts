import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getTotalUserPostsProps {
  userId: string;
}

const getTotalUserPosts = async ({ userId }: getTotalUserPostsProps) => {
  // インメモリの "use cache" はインスタンスが入れ替わるたびに消えて DB を起こすため、共有キャッシュに置く
  "use cache: remote";
  cacheTag(`get-user-posts:${userId}`, "get-post");
  cacheLife("max");

  const count = await prisma.video.count({
    where: {
      postedUserId: userId,
    },
  });
  return count;
};

export default getTotalUserPosts;
