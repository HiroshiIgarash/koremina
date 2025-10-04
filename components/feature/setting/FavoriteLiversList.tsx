import ChannelIcon from "./ChannelIcon";
import Link from "next/link";
import getCurrentUserWithTag from "@/app/action/getCurrentUserWithTag";

/**
 * 推しライバー一覧を表示するコンポーネント
 * データ取得を含むため、Suspenseで囲んで使用する
 */
const FavoriteLiversList = async () => {
  const currentUser = await getCurrentUserWithTag();

  if (!currentUser) return null;

  return (
    <>
      {currentUser.favoriteLivers.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,64px)] justify-center gap-2 w-full">
          {currentUser.favoriteLivers
            .toSorted((a, b) => a.index - b.index)
            .map(liver => (
              <Link
                key={liver.id}
                href={`/page?liver=${liver.id}`}
                className="rounded-full hover:opacity-70 transition-opacity"
              >
                <ChannelIcon channelId={liver.channelHandle} size={64} />
              </Link>
            ))}
        </div>
      ) : (
        <div className="text-center">
          <p>
            あなたの推しのライバーを設定しましょう！
            <br />
            何人でもOK！
          </p>
        </div>
      )}
    </>
  );
};

export default FavoriteLiversList;
