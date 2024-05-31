"use server"

import prisma from "@/lib/db"
import { unstable_cache } from "next/cache";

const getLivers = async () => {
  const getCachedLivers = unstable_cache(
    async () => prisma.liver.findMany(),
    undefined,
    {
      revalidate: 60 * 30
    }
  );

  try {
    const livers = await getCachedLivers()
    return livers
  } catch (error) {
    console.log(error)
    return []
  }

}

export default getLivers