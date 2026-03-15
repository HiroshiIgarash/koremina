"use server";

import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";

const postComment = async (postId: string, formData: FormData) => {
  const session = await auth();
  try {
    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }

    const rawFormData = {
      comment: formData.get("comment"),
    };

    const comment = rawFormData.comment?.toString() ?? "";
    if (!comment || comment.length > 1000) {
      return { error: "InvalidData" };
    }

    await prisma.comment.create({
      data: {
        content: comment,
        author: {
          connect: {
            id: session.user.id,
          },
        },
        video: {
          connect: {
            id: postId,
          },
        },
      },
    });
  } catch {
    return {
      error: "Failed to post comment",
    };
  }

  revalidateTag(`get-comments:${postId}`, "seconds");
};

export default postComment;
