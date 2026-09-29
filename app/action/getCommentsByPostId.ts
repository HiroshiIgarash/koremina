import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getCommentsByPostId = async (postId: string) => {
  // インメモリの "use cache" はインスタンスが入れ替わるたびに消えて DB を起こすため、共有キャッシュに置く
  "use cache: remote";
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
