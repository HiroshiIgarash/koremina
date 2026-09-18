"use cache";

import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getLivers = async () => {
  cacheTag("get-livers");
  cacheLife("max");

  try {
    const livers = await prisma.liver.findMany({
      orderBy: {
        index: "asc",
      },
    });
    return livers;
  } catch (error) {
    console.error("[getLivers] エラー:", error);
    return [];
  }
};

export default getLivers;
