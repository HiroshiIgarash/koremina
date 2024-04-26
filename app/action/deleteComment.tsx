"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface deleteCommentProps {
  commentId: string
  postId: string
}

const deleteComment = async ({ commentId, postId }: deleteCommentProps) => {
  await prisma.comment.delete({
    where: {
      id: commentId
    }
  })

  revalidatePath(`/post/${postId}`)
  redirect(`/post/${postId}`)
}

export default deleteComment