import { Card, CardContent } from "@/components/ui/card";
import ChannelIcon from "../setting/ChannelIcon";
import { User } from "@prisma/client";

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
                <ChannelIcon
                  channelId={user.mostFavoriteLiver.channelHandle}
                  size={200}
                  quality="medium"
                />
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
                  <ChannelIcon
                    key={liver.id}
                    channelId={liver.channelHandle}
                    size={64}
                  />
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
