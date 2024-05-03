'use server'

import prisma from "@/lib/db"
import getCurrentUser from "./getCurrentUser"
import { revalidatePath } from "next/cache"

const updateMostFavoriteLiver = async (data: { liverId?: string | undefined}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return 'Unauthorized'
  }

  const { liverId } = data

  const updateData = liverId ? 
  {
    mostFavoriteLiver: {
      connect: {
        id:liverId
      }
    }
  } : {
    mostFavoriteLiverId: null
  }
  
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: updateData,
    include: {
      mostFavoriteLiver: true
    }
  })

  revalidatePath('/setting')

  return user.mostFavoriteLiver
}

export default updateMostFavoriteLiver