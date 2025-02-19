import prisma from "@/lib/db"

const getPostById = async (id: string) => {

  const post = await prisma.video.findUnique({
    where: {
      id
    },
    include: {
      postedUser: true,
      Bookmark: true,
      liver: true,
      seenUsers: true
    },
  })

  return post
}

export default getPostById