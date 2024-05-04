import prisma from "@/lib/db"

const getTotalPosts = async() => {
  const count = await prisma.video.count()
  return count
}

export default getTotalPosts