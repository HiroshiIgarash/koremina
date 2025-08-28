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
import { Bookmark, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BookmarkIcon } from "lucide-react";

interface PostItemPresentationProps {
  id: string;
  comment: string;
  videoId: string;
  postedUserName: string | null;
  postedUser: User;
  livers: { name: string }[];
  bookmark: Bookmark[];
  seenUsersId: string[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
  videoTitle: string | null;
  currentUserId?: string;
  isError?: boolean;
  // Storybookで使用するためのBookmarkButtonの代替
  BookmarkButtonComponent?: React.ComponentType<{
    postId: string;
    bookmarkedUsersId: string[];
    userId: string;
    seenUsersId: string[];
  }>;
}

// Storybookで使用するためのモックBookmarkButton
const MockBookmarkButton = () => (
  <BookmarkIcon size="1.4em" className="text-muted-foreground cursor-pointer" />
);

/**
 * 投稿アイテムのプレゼンテーション コンポーネント
 * データ取得に依存せず、Storybookで表示可能
 */
const PostItemPresentation = ({
  id,
  comment,
  videoId,
  postedUserName,
  postedUser,
  livers,
  bookmark,
  reactionsCount,
  seenUsersId,
  videoTitle,
  currentUserId,
  isError = false,
  BookmarkButtonComponent,
}: PostItemPresentationProps) => {
  // Storybookで実行中かつBookmarkButtonComponentが提供されていない場合はモックを使用
  const isStorybook = typeof window !== 'undefined' && window.location?.port === '6006';
  
  return (
    <div className="relative">
      {currentUserId && (
        <button className="absolute top-4 right-4">
          {isStorybook && !BookmarkButtonComponent ? (
            <MockBookmarkButton />
          ) : BookmarkButtonComponent ? (
            <BookmarkButtonComponent
              postId={id}
              bookmarkedUsersId={bookmark.map(b => b.userId)}
              userId={currentUserId}
              seenUsersId={seenUsersId}
            />
          ) : (
            // 通常のアプリケーションでは動的インポートを使用
            <div>Loading bookmark button...</div>
          )}
        </button>
      )}
      <Link href={`/post/${id}`}>
        <Card className="flex flex-col h-full hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition">
          <CardHeader className="pb-2">
            <CardTitle
              className={cn(
                "text-lg md:h-[4em] leading-tight",
                currentUserId && "pr-6"
              )}
            >
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
              className={cn("text-xs", isError && "text-muted-foreground")}
            >
              {isError ? "動画タイトルを取得できませんでした" : videoTitle}
            </p>
          </CardContent>
          <CardFooter className="flex items-end flex-col space-y-2 text-sm">
            <div className="flex gap-2 justify-self-end">
              <span className="rounded-full px-2">
                <BookmarkIcon
                  size="1.4em"
                  className="inline-block align-bottom"
                />{" "}
                {`${bookmark.length}`}
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

export default PostItemPresentation;