import prisma from "@/lib/db"

const getPostById = async (id: string) => {

  const post = await prisma.video.findUnique({
    where: {
      id
    },
    include: {
      postedUser: true,
      good: true,
      bad: true,
      love: true,
      funny: true,
      cry: true,
      angel: true,
    },
  })

  return post
}

export default getPostById