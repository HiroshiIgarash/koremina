import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return new NextResponse('Unauthenticated', { status: 401 })
  }
  const body = await req.json();
  const {
    videoId,
    comment,
    detailComment
  } = body

  if (!videoId || !comment) {
    return new NextResponse('Invalid data', { status: 400 })
  }

  const newPost = await prisma.video.create({
    data: {
      videoId,
      comment,
      detailComment,
      postedUser: {
        connect: {
          id: currentUser.id
        }
      }
    }
  })

  revalidatePath('/')

  return NextResponse.json(newPost)
}