import prisma from "@/lib/db";
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
    console.log(error);
  }
};

export default getBirthdayLivers;
