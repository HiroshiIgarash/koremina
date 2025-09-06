import dayjs from "../utils/dayjs";

describe("誕生日ロジックのテスト", () => {
  test("誕生日までの日数を正しく計算できること", () => {
    const today = dayjs("2024-01-15").tz();

    // 同じ年で今日より後の誕生日（3月10日）
    const birthDateSameYear = dayjs("2024-03-10").tz();
    const daysUntilSameYear = birthDateSameYear.diff(today, "day");

    expect(daysUntilSameYear).toBeGreaterThan(0);
    expect(daysUntilSameYear).toBe(55); // 1月15日から3月10日まで
  });

  test("年末年始の境界を正しく処理できること", () => {
    const today = dayjs("2024-12-30").tz();

    // 来年1月5日の誕生日
    let nextBirthday = dayjs("2024-01-05").tz();

    // 誕生日が今日より前の場合は1年追加
    if (
      nextBirthday.isBefore(today, "day") ||
      nextBirthday.isSame(today, "day")
    ) {
      nextBirthday = nextBirthday.add(1, "year");
    }

    const daysUntil = nextBirthday.diff(today, "day");

    // 6日間であるべき（12月30日 → 翌年1月5日）
    expect(daysUntil).toBe(6);
  });

  test("今日の誕生日を正しく処理できること", () => {
    const today = dayjs("2024-01-15").tz();
    const todayBirthday = dayjs("2024-01-15").tz();

    const daysUntil = todayBirthday.diff(today, "day");

    expect(daysUntil).toBe(0);
  });
});
