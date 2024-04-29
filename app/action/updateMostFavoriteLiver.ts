'use server'

import prisma from "@/lib/db"
import getCurrentUser from "./getCurrentUser"
import { revalidatePath } from "next/cache"

const updateMostFavoriteLiver = async (data: { liverId: string}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return 'Unauthorized'
  }

  const { liverId } = data
  
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      mostFavoriteLiver: {
        connect: {
          id:liverId
        }
      }
    },
    include: {
      mostFavoriteLiver: true
    }
  })

  revalidatePath('/setting')

  return user.mostFavoriteLiver
}

export default updateMostFavoriteLiver