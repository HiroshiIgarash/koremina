import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getCommentsByPostId = async (postId: string) => {
  "use cache";
  cacheTag(`get-comments:${postId}`);
  // タグ無効化（postComment / deleteComment）で即時更新されるため、時間ベースの再検証は不要
  cacheLife("max");
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
