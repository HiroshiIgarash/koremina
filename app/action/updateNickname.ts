'use server'

import prisma from "@/lib/db"
import getCurrentUser from "./getCurrentUser"

const updateNickname = async(formData: FormData) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null
  }

  const newNickname = formData.get('newNickname')?.toString()

  if (!newNickname || newNickname === '' || newNickname.length > 11) {
    return null
  }

  await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      nickname: newNickname
    }
  })
}

export default updateNickname