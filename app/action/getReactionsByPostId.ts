import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getReactionsByPostId = async (id: string) => {
  "use cache";
  cacheTag(`get-reactions:${id}`, "get-post");
  // タグ無効化（updateReaction）で即時更新されるため、時間ベースの再検証は不要
  cacheLife("max");
  const post = await prisma.video.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      good: {
        select: {
          id: true,
        },
      },
      bad: {
        select: {
          id: true,
        },
      },
      love: {
        select: {
          id: true,
        },
      },
      funny: {
        select: {
          id: true,
        },
      },
      cry: {
        select: {
          id: true,
        },
      },
      angel: {
        select: {
          id: true,
        },
      },
    },
  });

  return post;
};

export default getReactionsByPostId;
