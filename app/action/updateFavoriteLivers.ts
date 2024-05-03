'use server'

import prisma from "@/lib/db"
import getCurrentUser from "./getCurrentUser"
import { revalidatePath } from "next/cache"

const updateFavoriteLivers = async(liversId:string[]) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return 'Unauthorized'
  }

  const updateData = liversId.map(liverId => ({ id: liverId}))
  
  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteLivers: {
        set: updateData
      }
    }
  })

  revalidatePath('/setting')

  return user
}

export default updateFavoriteLivers