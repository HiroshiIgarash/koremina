"use server"

import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";

const updateBookmark = async (
  postId: string,
  active: boolean,
) => {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    return "Unauthorized";
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: { bookmarks: { select: { id: true } } },
  });

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const updateData = active
    ? [...user.bookmarks.filter((post) => post.id !== postId)]
    : [...user.bookmarks.map((post) => ({ id: post.id })), { id: postId }];

  await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      bookmarks: {
        set: updateData,
      },
    },
  });
};

export default updateBookmark;
