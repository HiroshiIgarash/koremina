import { Card, CardContent } from "@/components/ui/card";
import ChannelIcon from "./ChannelIcon";
import MostFavoriteLiverDialog from "./MostFavoriteLiverDialog";
import { Button } from "@/components/ui/button";
import getCurrentUser from "@/app/action/getCurrentUser";
import FavoriteLiversDialog from "./FavoriteLiversDialog";
import Link from "next/link";

const FavoriteLiversArea = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;

  return (
    <Card>
      <CardContent className="p-4 md:p-8 space-y-12">
        <div>
          <p className="font-semibold text-xl text-center my-4">
            最推しライバー
          </p>
          <div className="flex flex-col items-center justify-center">
            {currentUser.mostFavoriteLiver ? (
              <>
                <Link
                  key={currentUser.mostFavoriteLiver.id}
                  href={`/page?liver=${currentUser.mostFavoriteLiver.id}`}
                  className="rounded-full hover:opacity-70 transition-opacity"
                >
                  <ChannelIcon
                    channelId={currentUser.mostFavoriteLiver.channelHandle}
                    size={200}
                    quality="medium"
                  />
                </Link>
                <span>{currentUser.mostFavoriteLiver.name}</span>
              </>
            ) : (
              <p className="text-center">
                あなたの「最推し」ライバーを
                <br className="md:hidden" />
                設定しましょう！
              </p>
            )}
            <MostFavoriteLiverDialog user={currentUser}>
              <Button className="mt-8">最推しライバーを選択</Button>
            </MostFavoriteLiverDialog>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl text-center my-4">推しライバー</p>
          <div className="flex flex-col items-center justify-center">
            {currentUser.favoriteLivers.length > 0 ? (
              <div className="grid grid-cols-[repeat(5,auto)] justify-center gap-2">
                {currentUser.favoriteLivers.map((liver) => (
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
            <FavoriteLiversDialog user={currentUser}>
              <Button className="mt-8">推しライバーを選択</Button>
            </FavoriteLiversDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLiversArea;
