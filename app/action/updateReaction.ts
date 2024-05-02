"use server"

import prisma from "@/lib/db";
import { Reaction } from "@/types/type";
import getCurrentUser from "./getCurrentUser";
import { NextResponse } from "next/server";

const updateReaction = async (reaction: Reaction, postId: string,register:boolean) => {

  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return new NextResponse('Unauthorized',{status: 401})
  }

  await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      goodVideo: {
        push: {
          connect: {
            id: postId
          }
        }
      }
    }
  })
}

export default updateReaction