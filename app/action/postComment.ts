"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
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

    if (!rawFormData.comment) {
      return { error: "InvalidData" };
    }

    await prisma.comment.create({
      data: {
        content: rawFormData.comment.toString(),
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

  revalidatePath(`/post/${postId}`);
};

export default postComment;
