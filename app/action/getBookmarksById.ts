import prisma from "@/lib/db";

interface IParam {
  userId: string;
}

const getBookmarksById = async ({ userId }: IParam) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      post: true
    }
  })

  return bookmarks
};

export default getBookmarksById;
