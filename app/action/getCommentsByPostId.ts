import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getCommentsByPostId = async (postId: string) => {
  "use cache";
  cacheTag(`get-comments:${postId}`);
  cacheLife("seconds");
  try {
    const comments = await prisma.comment.findMany({
      where: {
        videoId: postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  } catch {
    return null;
  }
};

export default getCommentsByPostId;
