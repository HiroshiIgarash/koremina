import { getNearestBirthdayLivers } from "@/app/action/getBirthdayLivers";
import Link from "next/link";
import ChannelIcon from "./feature/setting/ChannelIcon";
import { cn } from "@/lib/utils";

const Birthday = async ({ className }: { className?: string }) => {
  const birthdayData = await getNearestBirthdayLivers();
  const { livers, daysUntil, isToday } = birthdayData;

  // セクションタイトルを動的に決定
  const sectionTitle = isToday
    ? "今日が誕生日のライバー"
    : "直近の誕生日ライバー";

  // サブテキストを決定
  const getSubText = () => {
    if (isToday) {
      return "今日が誕生日！";
    } else if (daysUntil === 1) {
      return "明日が誕生日！";
    } else {
      return `${daysUntil}日後に誕生日`;
    }
  };

  return (
    <div
      className={cn("w-full py-8 bg-slate-100 dark:bg-slate-600", className)}
    >
      <p className="text-center font-bold text-lg">{sectionTitle}</p>
      {livers && livers.length > 0 ? (
        <>
          <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
            {getSubText()}
          </p>
          <ul className="mt-4 flex gap-4 justify-center">
            {livers.map(liver => (
              <li key={liver.id} className="flex flex-col items-center">
                <Link
                  key={liver.id}
                  href={`/page?liver=${liver.id}`}
                  className="rounded-full hover:opacity-70 transition-opacity"
                >
                  <ChannelIcon
                    key={liver.id}
                    channelId={liver.channelHandle}
                    size={80}
                  />
                </Link>
                <p className="text-center text-sm mt-1">{liver.name}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center mt-4">誕生日情報がありません</p>
      )}
    </div>
  );
};

export default Birthday;
