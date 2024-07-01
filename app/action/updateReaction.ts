"use server";

import prisma from "@/lib/db";
import { Reaction } from "@/types/type";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { User } from "@prisma/client";

const updateReaction = async (
  reaction: Reaction,
  postId: string,
  active: boolean,
  currentUser: User
) => {
  const reactionVideo = `${reaction}Video` as const;
  const includeVideo = Object.fromEntries([[reactionVideo, true]]);

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: includeVideo,
  });

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const newReactionVideoIds = active
    ? [...user[reactionVideo].filter((v) => v.id !== postId).map((v) => v.id)]
    : [...user[reactionVideo].map((v) => v.id), postId];

  const updateData = Object.fromEntries([
    [reactionVideo, { set: newReactionVideoIds.map((i) => ({ id: i })) }],
  ]);

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: updateData,
  });

  revalidatePath(`/post/${postId}`);
  revalidateTag("get-post");
};

export default updateReaction;
