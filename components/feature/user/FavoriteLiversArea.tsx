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
      index: number;
    } | null;
    favoriteLivers: {
      id: string;
      name: string;
      index: number;
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
                  href={`/page?liver=${user.mostFavoriteLiver.id}`}
                  className="rounded-full hover:opacity-70 transition-opacity"
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
          <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            {user.favoriteLivers.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fit,64px)] justify-center gap-2 w-full">
                {user.favoriteLivers
                  .toSorted((a, b) => a.index - b.index)
                  .map((liver) => (
                    <Link
                      key={liver.id}
                      href={`/page?liver=${liver.id}`}
                      className="rounded-full hover:opacity-70 transition-opacity"
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
