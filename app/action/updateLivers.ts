"use server";

import prisma from "@/lib/db";
import { Liver } from "@prisma/client";

const updateLivers = async (liversJSON: Liver[]) => {
  const query = liversJSON.map(l =>
    prisma.liver.upsert({
      where: {
        id: l.id,
      },
      update: {
        index: l.index,
        isRetire: l.isRetire,
        isOverseas: l.isOverseas,
        name: l.name,
        aliasFirst: l.aliasFirst,
        aliasSecond: l.aliasSecond,
        channelHandle: l.channelHandle,
      },
      create: {
        index: l.index,
        isRetire: l.isRetire,
        isOverseas: l.isOverseas,
        name: l.name,
        aliasFirst: l.aliasFirst,
        aliasSecond: l.aliasSecond,
        channelHandle: l.channelHandle,
      },
    })
  );

  const result = await prisma.$transaction([...query]);

  return { count: result.length };
};

export default updateLivers;
