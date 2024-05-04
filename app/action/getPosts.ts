import prisma from "@/lib/db"

interface getPostsProps {
  take?: number
  skip?: number
}

const getPosts = async ({take, skip}: getPostsProps = {}) => {
  const posts = await prisma.video.findMany({
    orderBy: {
      postedAt: 'desc'
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true
        }
      },
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
        }
      },
    },
    take,
    skip
  })

  return posts
}

export default getPosts