import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/lib/db";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const body = await req.json();
  const { videoId, comment, detailComment, liver: liversId } = body;

  if (!videoId || !comment || liversId.length === 0) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  const newPost = await prisma.video.create({
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id,
        },
      },
      liver: {
        connect: (liversId as string[]).map((l) => ({ id: l })),
      },
    },
  });

  revalidateTag("get-post");

  return NextResponse.json(newPost);
};

export const PUT = async (req: Request) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const body = await req.json();
  const { postId, videoId, comment, detailComment, liver: liversId } = body;

  console.log(liversId);

  if (!videoId || !comment || liversId.length === 0) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  const newPost = await prisma.video.update({
    where: {
      id: postId,
    },
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id,
        },
      },
      liver: {
        set: (liversId as string[]).map((l) => ({ id: l })),
      },
    },
  });

  revalidateTag("get-post");
  revalidateTag(`get-post-by-id:${newPost.id}`);

  return NextResponse.json(newPost);
};
