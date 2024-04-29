import prisma from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
  try {
    const liver = await prisma.liver.findMany()

    return NextResponse.json(liver)
  } catch (error) {
    return new Response('Internal Server Error',{status: 500})
  }
}

