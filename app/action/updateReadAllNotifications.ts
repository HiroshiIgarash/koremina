"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

const updateReadAllNotifications = async () => {

  const session = await auth()

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      isRead: false
    },
    data: {
      isRead: true
    }
  })

  revalidateTag(`get-notifications-${session.user.id}`)
}

export default updateReadAllNotifications