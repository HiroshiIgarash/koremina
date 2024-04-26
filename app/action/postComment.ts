'use server'

import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import getCurrentUser from "./getCurrentUser"

const postComment = async (postId:string,formData: FormData) => {
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
    const newComment = await prisma.comment.create({
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

    return newComment.content

  } catch (error) {
    return 'error'
  }
}

export default postComment