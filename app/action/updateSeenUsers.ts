"use server";

import prisma from "@/lib/db";
import getCurrentUser from "./getCurrentUser";
import { updateTag } from "next/cache";

const updateSeenUsers = async (
  postId: string,
  type: "CONNECT" | "DISCONNECT"
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return "Unauthorized";
  }

  const seenUsers =
    type === "DISCONNECT"
      ? await prisma.video.update({
          where: {
            id: postId,
          },
          data: {
            seenUsers: {
              disconnect: [
                {
                  id: currentUser.id,
                },
              ],
            },
          },
        })
      : await prisma.video.update({
          where: {
            id: postId,
          },
          data: {
            seenUsers: {
              connect: [
                {
                  id: currentUser.id,
                },
              ],
            },
          },
        });

  // 視聴済みの情報は get-post タグのキャッシュ（getPosts / getUserPosts など）には
  // 含まれていないため、ここで get-post を無効化する必要はない。
  // seenUsers を実際に読んでいるキャッシュだけを対象にする。
  updateTag(`bookmark-info:${postId}`);
  updateTag(`bookmark:${currentUser.id}`);

  return seenUsers;
};

export default updateSeenUsers;
