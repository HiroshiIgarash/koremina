import prisma from "@/lib/db";

interface IParam {
  take?: number
  skip?: number
  userId: string;
}

const getBookmarksById = async ({take,skip,userId }: IParam) => {
  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      post: {
        include: {
          postedUser: true,
          liver: true,
          Bookmark: true,
          _count: {
            select: {
              good: true,
              bad: true,
              love: true,
              funny: true,
              cry: true,
              angel: true,
              comments: true
            }
          },
          seenUsers: true
        }
      },
    },
    take,
    skip
  })

  return bookmarks
};

export default getBookmarksById;
