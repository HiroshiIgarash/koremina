'use server'

import prisma from "@/lib/db"
import getCurrentUser from "./getCurrentUser"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const postComment = async (postId: string, formData: FormData) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return 'Unauthorized'
  }

  const rawFormData = {
    comment: formData.get('comment')
  }


  if (!rawFormData.comment) {
    return 'InvalidData'
  }

  try {
    await prisma.comment.create({
      data: {
        content: rawFormData.comment.toString(),
        author: {
          connect: {
            id: currentUser.id
          }
        },
        video: {
          connect: {
            id: postId
          }
        }
      }
    })

  } catch (error) {
    return 'error'
  }

  revalidatePath(`/post/${postId}`)
  redirect(`/post/${postId}`)
}

export default postComment