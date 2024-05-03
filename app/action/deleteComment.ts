"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

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
}

export default deleteComment