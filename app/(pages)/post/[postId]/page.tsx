import getPostById from "@/app/action/getPostById";
import Avatar from "@/components/Avatar";
import CommentArea from "@/components/feature/comment/CommentArea";
import BookmarkButton from "@/components/feature/post/BookMarkButton";
import ReactionButtonList from "@/components/feature/post/ReactionButtonList";
import SkeletonReactionButtonList from "@/components/feature/post/SkeletonReactionButtonList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, cache } from "react";
import { noto } from "../../layout";
import PostDeleteDialog from "@/components/feature/post/PostDeleteDialog";
import { auth } from "@/auth";
import ReportDialog from "@/components/feature/post/ReportDialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import getYoutubeTitleById from "@/utils";
import { YouTubeEmbed } from "@next/third-parties/google";

interface IParams {
  postId: string;
}

const getCachedPostById = cache(getPostById);

export async function generateMetadata(props: { params: Promise<IParams> }) {
  const params = await props.params;
  const { postId } = params;
  const post = await getCachedPostById(postId);

  if (!post) return;

  return {
    title: post.comment,
  };
}

const Page = async (props: { params: Promise<IParams> }) => {
  const params = await props.params;
  const { postId } = params;

  const session = await auth();

  const post = await getCachedPostById(postId);

  const currentUser = session?.user;

  if (!post) {
    notFound();
  }

  const title = await getYoutubeTitleById(post.videoId);

  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4 w-full">
      <div>
        <div className="sticky top-28 space-y-4">
          <YouTubeEmbed videoid={post.videoId} height={400} />
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <Button
                className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)] text-white"
                asChild
              >
                <Link
                  href={`https://www.youtube.com/watch?v=${post.videoId}`}
                  target="_blank"
                >
                  Youtubeで視聴する
                </Link>
              </Button>
              <Button
                className="bg-black hover:bg-black/75 dark:border text-white"
                asChild
              >
                <Link
                  href={`https://x.com/intent/post?text=${encodeURIComponent(
                    `

#コレミナ から動画をシェアしました！

${title}
https://youtu.be/${post.videoId}`
                  )}`}
                  target="_blank"
                  className="flex items-center gap-4"
                >
                  <Image
                    src="/x-logo-white.png"
                    width="20"
                    height="20"
                    alt=""
                  />
                  Xでシェアする
                </Link>
              </Button>
            </div>
            <Suspense fallback={<SkeletonReactionButtonList />}>
              <div className="text-right">
                <ReactionButtonList postId={postId} />
                {session && (
                  <ReportDialog postId={postId}>
                    <button className="text-sm text-destructive mt-2 underline underline-offset-2">
                      通報する
                    </button>
                  </ReportDialog>
                )}
              </div>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <Card className="relative">
          {currentUser?.id && (
            <div className="absolute top-4 right-4 flex gap-2">
              {post.postedUserId === currentUser.id && (
                <>
                  <Link href={`/post/edit/${postId}`}>
                    <FilePenLine />
                  </Link>
                  <PostDeleteDialog postId={postId}>
                    <Trash2 color="red" />
                  </PostDeleteDialog>
                </>
              )}
              <button>
                <BookmarkButton
                  postId={postId}
                  userId={currentUser.id}
                  bookmarkedUsersId={post.Bookmark.map((b) => b.userId)}
                  seenUsersId={post.seenUsers.map((u) => u.id)}
                />
              </button>
            </div>
          )}
          <CardHeader className="space-y-4 pb-0">
            <CardTitle
              className={cn(
                "leading-tight",
                post.postedUserId === currentUser?.id ? "pr-20" : "pr-6"
              )}
            >
              <div>{post.comment}</div>
            </CardTitle>
            <Link
              href={`/user/${post.postedUser.id}`}
              className="my-8 w-fit hover:opacity-70 transition-opacity ml-auto"
            >
              <div className="flex justify-end items-center gap-2">
                <Avatar user={post.postedUser} size={32} />
                <p className="text-sm truncate max-w-40">
                  {post.postedUser.nickname || post.postedUser.name}
                </p>
              </div>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="mt-2 flex flex-wrap gap-2">
              {post.liver.map((l) => (
                <Badge
                  key={l.name}
                  variant="outline"
                  className="whitespace-nowrap text-sm hover:border-sky-500 transition"
                >
                  <Link href={`/page?liver=${l.id}`}>{l.name}</Link>
                </Badge>
              ))}
            </div>
            {post.detailComment && (
              <pre
                className={cn(
                  "mt-2 whitespace-pre-wrap break-all",
                  noto.className
                )}
              >
                {post.detailComment}
              </pre>
            )}
            <Separator className="my-4" />
            <CommentArea postId={postId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
