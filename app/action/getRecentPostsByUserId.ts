import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getRecentPostsByUserIdProps {
  userId: string;
  count?: number;
}

const getRecentPostsByUserId = async ({
  userId,
  count,
}: getRecentPostsByUserIdProps) => {
  "use cache";
  cacheTag(`get-user-posts:${userId}`, "get-post");
  cacheLife("max");

  const posts = await prisma.video.findMany({
    where: {
      postedUserId: userId,
    },
    take: count,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedUser: true,
      liver: true,
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
  });

  return posts;
};

export default getRecentPostsByUserId;
