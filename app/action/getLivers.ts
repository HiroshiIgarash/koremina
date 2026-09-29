// インメモリの "use cache" はインスタンスが入れ替わるたびに消えて DB を起こすため、共有キャッシュに置く
"use cache: remote";

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
