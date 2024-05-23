import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { Reaction } from "@/types/type";
import { Liver } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface RecentPostItemProps {
  postId: string;
  videoId: string;
  comment: string;
  livers: Liver[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
}

const RecentPostItem = async ({
  postId,
  videoId,
  comment,
  livers,
  reactionsCount,
}: RecentPostItemProps) => {
  // 動画タイトルの取得
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`,
    { cache: "force-cache" }
  )
    .then((r) => {
      if (r.status === 200) {
        return r.json();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      return [];
    });

  const title = res.items?.[0].snippet.title;

  return (
    <Link href={`/post/${postId}`}>
      <Card className="grid lg:grid-cols-[49%,auto] h-full gap-4 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition p-4">

        <div className="space-y-2 lg:col-start-2">
          <CardTitle className="text-lg leading-tight">{comment}</CardTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {livers.map((liver) => (
              <Badge key={liver.id} variant="outline">
                {liver.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="lg:row-start-1 lg:row-span-2 w-full shrink-0">
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={1600}
            height={900}
            className="aspect-video object-cover"
          />
          <p className="text-xs mt-2">{title}</p>
        </div>

        <div className="lg:self-end flex items-end flex-col space-y-2 text-sm">
          <div className="flex gap-2 justify-self-end">
            <span className=" rounded-full py-1 px-2">
              💬 {`${reactionsCount.comments}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              👍 {`${reactionsCount.good}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              👎 {`${reactionsCount.bad}`}
            </span>
          </div>
          <div className="flex gap-2">
            <span className=" rounded-full py-1 px-2">
              😍 {`${reactionsCount.love}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              🤣 {`${reactionsCount.funny}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              😭 {`${reactionsCount.cry}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              😇 {`${reactionsCount.angel}`}
            </span>
          </div>
        </div>

      </Card>
    </Link>
  );
};

export default RecentPostItem;
