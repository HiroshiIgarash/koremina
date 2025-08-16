"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { del } from "@vercel/blob";
import { revalidateTag } from "next/cache";

const updateAvatar = async (url?: string) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error("unauthorized");

  const { uploadedImage: prevAvatar } =
    (await prisma.user.findUnique({
      where: { id: session.user.id },
    })) || {};

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      uploadedImage: url || null,
    },
  });

  if (prevAvatar) await del(prevAvatar);

  revalidateTag("get-post");

  return user;
};

export default updateAvatar;
