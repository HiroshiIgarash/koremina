import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getTotalUserPostsProps {
  userId: string;
}

const getTotalUserPosts = async ({ userId }: getTotalUserPostsProps) => {
  "use cache";
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
