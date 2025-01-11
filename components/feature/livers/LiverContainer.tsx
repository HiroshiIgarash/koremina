import getLivers from "@/app/action/getLivers";
import ChannelIcon from "../setting/ChannelIcon";
import { Liver } from "@prisma/client";
import { ArrowDownCircle, Heart, Star } from "lucide-react";
import getCurrentUserWithTag from "@/app/action/getCurrentUserWithTag";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LiverContainer = async () => {
  const livers = await getLivers();
  const user = await getCurrentUserWithTag();

  // ライバー（JP）
  const liversJp = livers.filter(
    (liver) => !liver.isOverseas && !liver.isRetire
  );

  // ライバー（海外）
  const liversOverseas = livers.filter(
    (liver) => liver.isOverseas && !liver.isRetire
  );

  // 卒業ライバー
  const liversRetired = livers.filter((liver) => liver.isRetire);

  return (
    <>
      <div className="px-4 w-full max-w-5xl mx-auto scroll-mt-5">
        <h1 className="text-3xl font-bold mb-16">ライバー一覧</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild variant="secondary">
            <Link href="#jp" className="flex items-center gap-1">
              <ArrowDownCircle size={"1.2em"} />
              ライバー（JP）
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="#overseas" className="flex items-center gap-1">
              <ArrowDownCircle size={"1.2em"} />
              ライバー（海外）
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="#retired" className="flex items-center gap-1">
              <ArrowDownCircle size={"1.2em"} />
              卒業ライバー
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-20">
          <LiverList
            livers={liversJp}
            heading="ライバー（JP）"
            user={user}
            id="jp"
          />
          <LiverList
            livers={liversOverseas}
            heading="ライバー（海外）"
            user={user}
            id="overseas"
          />
          <LiverList
            livers={liversRetired}
            heading="卒業ライバー"
            user={user}
            id="retired"
          />
        </div>
      </div>
    </>
  );
};

const LiverList = ({
  livers,
  heading,
  user,
  id,
}: {
  livers: Liver[];
  heading: string;
  user?: Awaited<ReturnType<typeof getCurrentUserWithTag>>;
  id?: string;
}) => {
  return (
    <div id={id}>
      <h2 className="font-bold text-2xl border-b-4 border-current pb-4">
        {heading}
      </h2>
      <div className="pt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-8">
        {livers.map((liver) => (
          <div key={liver.id} className="relative flex flex-col items-center">
            {user?.mostFavoriteLiverId === liver.id && (
              <Heart
                fill="red"
                stroke="pink"
                className="absolute t-0 left-0 z-10 size-1/3 aspect-square"
                size={"100%"}
              />
            )}
            {user?.favoriteLivers.some(
              (fav) =>
                fav.id === liver.id && fav.id !== user.mostFavoriteLiverId
            ) && (
              <Star
                fill="yellow"
                stroke="orange"
                className="absolute t-0 left-0 z-10 size-1/3 aspect-square"
                size={"100%"}
              />
            )}
            <Link
              href={`/page?liver=${liver.id}`}
              className="w-full hover:opacity-70 transition-opacity"
            >
              <Suspense
                fallback={
                  <Skeleton className="w-full aspect-square rounded-full" />
                }
              >
                <ChannelIcon channelId={liver.channelHandle} size={200} />
              </Suspense>
            </Link>
            <span className="text-xs">{liver.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiverContainer;
