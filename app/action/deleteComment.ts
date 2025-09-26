"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

interface deleteCommentProps {
  commentId: string;
  postId: string;
}

const deleteComment = async ({ commentId, postId }: deleteCommentProps) => {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  } catch {
    return {
      error: "Failed to delete comment",
    };
  }

  revalidatePath(`/post/${postId}`);
};

export default deleteComment;
