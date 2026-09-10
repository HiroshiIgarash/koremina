import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface IParam {
  take?: number;
  skip?: number;
  userId: string;
}

const getBookmarksById = async ({ take, skip, userId }: IParam) => {
  "use cache";
  cacheTag(`bookmark:${userId}`, "get-post");
  cacheLife("max");

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
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
          seenUsers: true,
        },
      },
    },
    take,
    skip,
  });

  return bookmarks;
};

export default getBookmarksById;
