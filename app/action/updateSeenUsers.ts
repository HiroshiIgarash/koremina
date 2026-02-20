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

  updateTag("get-post");
  return seenUsers;
};

export default updateSeenUsers;
