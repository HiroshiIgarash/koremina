"use server";

import prisma from "@/lib/db";
import { Liver } from "@prisma/client";
import { updateTag } from "next/cache";

const updateLivers = async (liversJSON: Liver[]) => {
  // id が空の行は DB との名前照合に失敗した行。upsert すると必ず create になり
  // 重複レコードを生むため対象から除外する（新規登録は各行の単体フォームで行う）
  const targets = liversJSON.filter(l => l.id);
  const skipped = liversJSON.length - targets.length;

  const query = targets.map(l =>
    prisma.liver.update({
      where: {
        id: l.id,
      },
      data: {
        index: l.index,
        isRetire: l.isRetire,
        isOverseas: l.isOverseas,
        name: l.name,
        aliasFirst: l.aliasFirst,
        aliasSecond: l.aliasSecond,
        channelHandle: l.channelHandle,
        birthMonth: l.birthMonth,
        birthDate: l.birthDate,
      },
    })
  );

  const result = await prisma.$transaction([...query]);

  updateTag("get-livers");

  return { count: result.length, skipped };
};

export default updateLivers;
