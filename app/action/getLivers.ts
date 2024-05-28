"use server"

import prisma from "@/lib/db"

const getLivers = async() => {
  try {
    const livers = await prisma.liver.findMany()
    return livers
  } catch (error) {
    console.log(error)
    return []
  }

}

export default getLivers