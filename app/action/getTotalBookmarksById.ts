import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

interface IParam {
  userId: string;
}

const getTotalBookmarksById = async ({ userId }: IParam) => {
  "use cache";
  cacheTag(`bookmark:${userId}`);
  cacheLife("max");

  const count = await prisma.bookmark.count({
    where: {
      userId: userId,
    },
  });

  return count;
};

export default getTotalBookmarksById;
