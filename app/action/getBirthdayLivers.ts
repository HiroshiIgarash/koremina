import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";
import dayjs from "@/utils/dayjs";

interface getBirthdayLiversProps {
  month?: number;
  date?: number;
}

/**
 * 誕生日のライバーを取得する
 * 引数を省略した場合は今日誕生日のライバーを取得
 * monthのみ指定した場合はその月が誕生日のライバーを取得（dateも同様）
 */
const getBirthdayLivers = async (
  { month, date }: getBirthdayLiversProps = {
    month: dayjs().tz().month() + 1,
    date: dayjs().tz().date(),
  }
) => {
  try {
    const livers = await prisma.liver.findMany({
      where: {
        birthMonth: month,
        birthDate: date,
        isRetire: false,
      },
      orderBy: {
        index: "asc",
      },
    });
    return livers;
  } catch (error) {
    console.error("[getBirthdayLivers] エラー:", error);
  }
};

/**
 * 最も近い誕生日のライバーを取得する
 * 今日誕生日のライバーがいる場合はそれを返す
 * いない場合は最も近い未来の誕生日のライバーを返す
 */
export const getNearestBirthdayLivers = async (todayKey: string) => {
  "use cache";
  cacheTag("get-birthday-livers");
  // todayKey が変わるまで再取得しない。時間ベースで再検証すると
  // その都度 DB を起こすことになるため、日付をキャッシュキーに含めて
  // 日付が変わった最初の 1 回だけ DB に到達させる。
  cacheLife("max");

  try {
    const today = dayjs.tz(todayKey);
    const currentMonth = today.month() + 1;
    const currentDate = today.date();

    // 今日が誕生日のライバーを先にチェック
    const todayLivers = await getBirthdayLivers({
      month: currentMonth,
      date: currentDate,
    });
    if (todayLivers && todayLivers.length > 0) {
      return {
        livers: todayLivers,
        daysUntil: 0,
        isToday: true,
      };
    }

    // 全ライバーを取得
    const allLivers = await prisma.liver.findMany({
      where: {
        isRetire: false,
        birthMonth: { not: null },
        birthDate: { not: null },
      },
      orderBy: {
        index: "asc",
      },
    });

    let nearestDays = Infinity;
    const nearestLivers = [];

    for (const liver of allLivers) {
      if (!liver.birthMonth || !liver.birthDate) continue;

      // 今年の誕生日（todayKey と基準を揃える）
      let thisBirthday = today
        .month(liver.birthMonth - 1)
        .date(liver.birthDate);

      // 今年の誕生日が過ぎていれば来年の誕生日を計算
      if (
        thisBirthday.isBefore(today, "day") ||
        thisBirthday.isSame(today, "day")
      ) {
        thisBirthday = thisBirthday.add(1, "year");
      }

      const daysUntil = thisBirthday.diff(today, "day");

      if (daysUntil < nearestDays) {
        nearestDays = daysUntil;
        nearestLivers.length = 0; // 配列をクリア
        nearestLivers.push(liver);
      } else if (daysUntil === nearestDays) {
        nearestLivers.push(liver);
      }
    }

    return {
      livers: nearestLivers,
      daysUntil: nearestDays,
      isToday: false,
    };
  } catch (error) {
    console.error("[getBirthdayLivers] エラー:", error);
    return {
      livers: [],
      daysUntil: 0,
      isToday: false,
    };
  }
};

export default getBirthdayLivers;
