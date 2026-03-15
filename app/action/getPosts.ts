import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface getPostsProps {
  take?: number;
  skip?: number;
  filterLiver?: string;
}

const getPosts = async ({ take, skip, filterLiver }: getPostsProps = {}) => {
  "use cache";
  cacheTag("get-post");
  cacheLife("minutes");

  const posts = await prisma.video.findMany({
    where: filterLiver
      ? {
          liver: {
            some: {
              id: filterLiver,
            },
          },
        }
      : {},
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

export default getPosts;
