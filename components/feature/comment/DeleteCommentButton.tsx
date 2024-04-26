"use client"

import deleteComment from "@/app/action/deleteComment"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useTransition } from "react"

interface DeleteCommentButtonProps {
  commentId: string
  postId: string
}

const DeleteCommentButton = ({ commentId, postId }: DeleteCommentButtonProps) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleClick = () => {
    startTransition(async () => {
      await deleteComment({ commentId, postId })
      toast({ description: "コメントを削除しました。" })
    })
  }


  return (
    <Button variant="destructive" size="sm" onClick={handleClick} disabled={isPending}>削除</Button>
  )
}

export default DeleteCommentButton