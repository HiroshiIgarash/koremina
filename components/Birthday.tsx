import getBirthdayLivers from "@/app/action/getBirthdayLivers";
import Link from "next/link";
import ChannelIcon from "./feature/setting/ChannelIcon";
import { cn } from "@/lib/utils";

const Birthday = async ({ className }: { className?: string }) => {
  const livers = await getBirthdayLivers();
  return (
    <div className={cn("w-full py-8 bg-slate-100", className)}>
      <p className="text-center font-bold text-lg">今日が誕生日のライバー</p>
      {livers && livers.length > 0 ? (
        <ul className="mt-4 flex gap-4 justify-center">
          {livers.map((liver) => (
            <li key={liver.id}>
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
      ) : (
        <p className="text-center mt-4">今日が誕生日のライバーはいません</p>
      )}
    </div>
  );
};

export default Birthday;
