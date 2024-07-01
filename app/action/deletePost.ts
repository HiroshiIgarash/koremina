"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import getPostById from "./getPostById";
import { revalidateTag } from "next/cache";

interface deletePostProps {
  postId: string;
}

const deletePost = async ({ postId }: deletePostProps) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("unAuthorized");

  const post = await getPostById(postId);
  if (!post) throw new Error("invalid postId");

  if (currentUser?.id !== post.postedUserId) throw new Error("not posted user");

  await prisma.video.delete({
    where: {
      id: postId,
    },
  });

  revalidateTag("get-post");
};

export default deletePost;
