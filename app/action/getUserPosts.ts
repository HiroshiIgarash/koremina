import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getUserPostsProps {
  userId: string;
  take?: number;
  skip?: number;
}

const getUserPosts = async ({ userId, take, skip }: getUserPostsProps) => {
  "use cache";
  cacheTag(`get-user-posts:${userId}`, "get-post");
  cacheLife("minutes");

  const posts = await prisma.video.findMany({
    where: {
      postedUserId: userId,
    },
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
          Bookmark: true,
        },
      },
    },
    take,
    skip,
  });

  return posts;
};

export default getUserPosts;
