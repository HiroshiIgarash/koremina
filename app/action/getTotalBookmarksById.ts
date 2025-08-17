import prisma from "@/lib/db";

interface IParam {
  userId: string;
}

const getTotalBookmarksById = async ({ userId }: IParam) => {
  const count = await prisma.bookmark.count({
    where: {
      userId: userId,
    },
  });

  return count;
};

export default getTotalBookmarksById;
