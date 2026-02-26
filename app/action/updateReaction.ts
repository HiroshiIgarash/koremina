"use server";

import prisma from "@/lib/db";
import { Reaction } from "@/types/type";
import { revalidateTag } from "next/cache";
import getCurrentUser from "./getCurrentUser";

// サーバーアクションは外部から任意の引数で呼び出せるため、ランタイムで許可値を検証する
const VALID_REACTIONS: Reaction[] = [
  "good",
  "bad",
  "love",
  "funny",
  "cry",
  "angel",
];

const updateReaction = async (
  reaction: Reaction,
  postId: string,
  active: boolean
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Unauthorized" };

  // 不正なリアクション値を拒否（TypeScriptの型は実行時に消失するため）
  if (!VALID_REACTIONS.includes(reaction)) {
    return { error: "Invalid reaction" };
  }

  const reactionVideo = `${reaction}Video` as const;
  const includeVideo = Object.fromEntries([[reactionVideo, true]]);

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: includeVideo,
  });

  if (!user) {
    return { error: "Unauthorized" };
  }

  const newReactionVideoIds = active
    ? [...user[reactionVideo].filter(v => v.id !== postId).map(v => v.id)]
    : [...user[reactionVideo].map(v => v.id), postId];

  const updateData = Object.fromEntries([
    [reactionVideo, { set: newReactionVideoIds.map(i => ({ id: i })) }],
  ]);

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: updateData,
  });

  revalidateTag("get-post", "minutes");
  revalidateTag(`get-reactions:${postId}`, "seconds");
};

export default updateReaction;
