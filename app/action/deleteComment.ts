"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./getCurrentUser";

interface deleteCommentProps {
  commentId: string;
  postId: string;
}

const deleteComment = async ({ commentId, postId }: deleteCommentProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Unauthorized");

  // コメントの所有者チェック
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true },
  });
  if (!comment) throw new Error("Comment not found");
  if (comment.authorId !== currentUser.id) throw new Error("Forbidden");

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

  revalidateTag(`get-comments:${postId}`, "seconds");
};

export default deleteComment;
