"use server"

import prisma from "@/lib/db"

const getLivers = async() => {
  const livers = await prisma.liver.findMany()

  return livers
}

export default getLivers