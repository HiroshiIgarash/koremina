import prisma from "@/lib/db"

const getPosts = async () => {
  const posts = await prisma.video.findMany({
    orderBy: {
      postedAt: 'desc'
    },
    include: {
      postedUser: true
    },
  })

  return posts
}

export default getPosts