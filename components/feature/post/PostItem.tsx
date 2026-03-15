import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Reaction } from "@/types/type";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import getYoutubeTitleById from "@/utils";
import { BookmarkIcon } from "lucide-react";
import PostBookmarkButton from "./PostBookmarkButton";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

interface PostItemProps {
  id: string;
  comment: string;
  videoId: string;
  postedUserName: string | null;
  postedUser: User;
  livers: { name: string }[];
  bookmarkCount: number;
  reactionsCount: { [k in Reaction]: number } & { comments: number };
}

const PostItem = async ({
  id,
  comment,
  videoId,
  postedUserName,
  postedUser,
  livers,
  bookmarkCount,
  reactionsCount,
}: PostItemProps) => {
  const title = await getYoutubeTitleById(videoId);

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <div className="absolute top-4 right-4 z-10">
          <PostBookmarkButton postId={id} />
        </div>
      </Suspense>
      <Link href={`/post/${id}`}>
        <Card className="flex flex-col h-full hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:h-[4em] leading-tight pr-6">
              {comment}
            </CardTitle>
            <div className="flex justify-end items-center gap-2">
              <Avatar user={postedUser} size={32} />
              <span className="text-sm truncate max-w-40">
                {postedUserName}
              </span>
            </div>
          </CardHeader>
          <CardContent className="grow space-y-2 pb-2">
            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="hidden shrink-0 md:grid text-black place-items-center text-xs bg-gray-300 rounded-full aspect-square w-4">
                      {livers.length}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <ul>
                      {livers.map(liver => (
                        <li key={liver.name}>{liver.name}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="marquee">
                <div
                  className="flex flex-wrap md:flex-nowrap gap-2"
                  style={{ animationDuration: `${livers.length - 1}s` }}
                >
                  {livers.map(liver => (
                    <Badge
                      key={liver.name}
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      {liver.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="-mx-6">
              <Image
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt=""
                width={1600}
                height={900}
                className="aspect-video object-cover"
                unoptimized
              />
            </div>
            <p
              className={cn("text-xs", title.error && "text-muted-foreground")}
            >
              {title.error ? "動画タイトルを取得できませんでした" : title}
            </p>
          </CardContent>
          <CardFooter className="flex items-end flex-col space-y-2 text-sm">
            <div className="flex gap-2 justify-self-end">
              <span className="rounded-full px-2">
                <BookmarkIcon
                  size="1.4em"
                  className="inline-block align-bottom"
                />{" "}
                {`${bookmarkCount}`}
              </span>
              <span className="rounded-full px-2">
                💬 {`${reactionsCount.comments}`}
              </span>
              <span className="rounded-full px-2">
                👍 {`${reactionsCount.good}`}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full px-2">
                😍 {`${reactionsCount.love}`}
              </span>
              <span className="rounded-full px-2">
                🤣 {`${reactionsCount.funny}`}
              </span>
              <span className="rounded-full px-2">
                😭 {`${reactionsCount.cry}`}
              </span>
              <span className="rounded-full px-2">
                😇 {`${reactionsCount.angel}`}
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default PostItem;
