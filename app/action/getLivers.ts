"use cache";

import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

const getLivers = async () => {
  cacheTag("get-livers");
  cacheLife("hours");

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
