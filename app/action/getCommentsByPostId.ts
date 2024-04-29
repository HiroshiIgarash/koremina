import prisma from "@/lib/db"

const getCommentsByPostId = async (postId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        videoId: postId
      },
      include: {
        author: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return comments
  } catch (error) {
    return null
  }
}

export default getCommentsByPostId