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
import BookmarkButton from "./BookMarkButton";
import { auth } from "@/auth";

interface PostItemProps {
  id: string;
  comment: string;
  videoId: string;
  postedUserName: string | null;
  postedUser: User;
  livers: { name: string }[];
  bookmark:Bookmark[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
}

const PostItem = async ({
  id,
  comment,
  videoId,
  postedUserName,
  postedUser,
  livers,
  bookmark,
  reactionsCount,
}: PostItemProps) => {
  //動画タイトルの取得
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

  const session = await auth();
  

  return (
    <div className="relative">
      {session?.user?.id && (
        <button className="absolute top-4 right-4">
          <BookmarkButton
            postId={id}
            bookmarkedUsersId = {bookmark.map(b=>b.userId)}
            userId = {session.user.id}
          />
        </button>
      )}
      <Link href={`/post/${id}`}>
        <Card className="flex flex-col h-full hover:border-sky-300 hover:bg-sky-50 transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:h-[4em] leading-tight pr-6">
              {comment}
            </CardTitle>
            <div className="flex justify-end items-center gap-2">
              <Avatar user={postedUser} size={32} />
              <span className="text-sm">{postedUserName}</span>
            </div>
          </CardHeader>
          <CardContent className="grow space-y-2 pb-2">
            <div className="flex items-center gap-2">
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="hidden shrink-0 md:grid place-items-center text-xs bg-gray-300 rounded-full aspect-square w-4">
                      {livers.length}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <ul>
                      {livers.map((liver) => (
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
                  {livers.map((liver) => (
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
            <Image
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt=""
              width={1600}
              height={900}
              className="aspect-video object-cover"
            />
            <p className="text-xs">{title}</p>
          </CardContent>
          <CardFooter className="flex items-end flex-col space-y-2 text-sm">
            <div className="flex gap-2 justify-self-end">
              <span className=" rounded-full px-2">
                💬 {`${reactionsCount.comments}`}
              </span>
              <span className=" rounded-full px-2">
                👍 {`${reactionsCount.good}`}
              </span>
              <span className=" rounded-full px-2">
                👎 {`${reactionsCount.bad}`}
              </span>
            </div>
            <div className="flex gap-2">
              <span className=" rounded-full px-2">
                😍 {`${reactionsCount.love}`}
              </span>
              <span className=" rounded-full px-2">
                🤣 {`${reactionsCount.funny}`}
              </span>
              <span className=" rounded-full px-2">
                😭 {`${reactionsCount.cry}`}
              </span>
              <span className=" rounded-full px-2">
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
