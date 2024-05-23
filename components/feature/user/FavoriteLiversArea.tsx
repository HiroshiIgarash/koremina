import { Card, CardContent } from "@/components/ui/card";
import ChannelIcon from "../setting/ChannelIcon";
import { User } from "@prisma/client";
import Link from "next/link";

interface FavoriteLiversAreaProps {
  user: User & {
    mostFavoriteLiver: {
      id: string;
      name: string;
      channelHandle: string;
    } | null;
    favoriteLivers: {
      id: string;
      name: string;
      channelHandle: string;
    }[];
  };
}

const FavoriteLiversArea = async ({ user }: FavoriteLiversAreaProps) => {
  if (!user) return;

  return (
    <Card>
      <CardContent className="p-4 md:p-8 space-y-12">
        <div>
          <p className="font-semibold text-xl text-center my-4">
            最推しライバー
          </p>
          <div className="flex flex-col items-center justify-center">
            {user.mostFavoriteLiver ? (
              <>
                <Link
                  key={user.mostFavoriteLiver.id}
                  href={`https://www.youtube.com/${user.mostFavoriteLiver.channelHandle}`}
                  className="rounded-full hover:opacity-70 transition-opacity"
                  target="_blank"
                >
                  <ChannelIcon
                    channelId={user.mostFavoriteLiver.channelHandle}
                    size={200}
                    quality="medium"
                  />
                </Link>
                <span>{user.mostFavoriteLiver.name}</span>
              </>
            ) : (
              <p className="text-center">未設定</p>
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl text-center my-4">推しライバー</p>
          <div className="flex flex-col items-center justify-center">
            {user.favoriteLivers.length > 0 ? (
              <div className="grid grid-cols-[repeat(5,auto)] justify-center gap-2">
                {user.favoriteLivers.map((liver) => (
                  <Link
                    key={liver.id}
                    href={`https://www.youtube.com/${liver.channelHandle}`}
                    className="rounded-full hover:opacity-70 transition-opacity"
                    target="_blank"
                  >
                    <ChannelIcon
                      key={liver.id}
                      channelId={liver.channelHandle}
                      size={64}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p>未設定</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLiversArea;
