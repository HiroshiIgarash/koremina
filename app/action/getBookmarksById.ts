import prisma from "@/lib/db";

interface IParam {
  userId: string;
}

const getBookmarksById = async ({ userId }: IParam) => {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    select: {bookmarks: true}
  })

  return user?.bookmarks
};

export default getBookmarksById;
