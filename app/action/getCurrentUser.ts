import { auth } from "@/auth"
import prisma from "@/lib/db"

const getCurrentUser = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      mostFavoriteLiver: true
    }
  })

  return user
}

export default getCurrentUser