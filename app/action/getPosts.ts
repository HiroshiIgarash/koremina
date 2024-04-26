import prisma from "@/lib/db"

const getPosts = async () => {
  const posts = await prisma.video.findMany({
    include: {
      postedUser: true
    }
  })

  return posts
}

export default getPosts