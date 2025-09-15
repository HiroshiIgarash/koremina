import Link from "next/link";
import ChannelIcon from "./ChannelIcon";
import getCurrentUserWithTag from "@/app/action/getCurrentUserWithTag";

const FavoriteLiversOnlyList = async () => {
  const currentUser = await getCurrentUserWithTag();

  if (!currentUser) return null;

  return (
    <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
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
    </div>
  );
};

export default FavoriteLiversOnlyList;