import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Reaction } from "@/types/type";
import { Liver } from "@prisma/client";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecentPostItemPresentationProps {
  postId: string;
  videoId: string;
  comment: string;
  livers: Liver[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
  bookmarkCount: number;
  videoTitle: string | null;
  isError?: boolean;
}

/**
 * 最近の投稿アイテムのプレゼンテーション コンポーネント
 * データ取得に依存せず、Storybookで表示可能
 */
const RecentPostItemPresentation = ({
  postId,
  videoId,
  comment,
  livers,
  reactionsCount,
  bookmarkCount,
  videoTitle,
  isError = false,
}: RecentPostItemPresentationProps) => {
  return (
    <Link href={`/post/${postId}`}>
      <Card className="grid lg:grid-cols-[49%_auto] h-full gap-4 hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition p-4">
        <div className="space-y-2 lg:col-start-2">
          <CardTitle className="text-lg leading-tight">{comment}</CardTitle>
          <div className="flex flex-wrap gap-2 mb-4">
            {livers.map(liver => (
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
            unoptimized
          />
          <p
            className={cn(
              "text-xs mt-2",
              isError && "text-muted-foreground"
            )}
          >
            {isError ? "動画タイトルを取得できませんでした" : videoTitle}
          </p>
        </div>

        <div className="lg:self-end flex items-end flex-col space-y-2 text-sm">
          <div className="flex gap-2 justify-self-end">
            <span className="rounded-full py-1 px-2">
              <BookmarkIcon
                size="1.4em"
                className="inline-block align-bottom"
              />{" "}
              {`${bookmarkCount}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              💬 {`${reactionsCount.comments}`}
            </span>
            <span className=" rounded-full py-1 px-2">
              👍 {`${reactionsCount.good}`}
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

export default RecentPostItemPresentation;