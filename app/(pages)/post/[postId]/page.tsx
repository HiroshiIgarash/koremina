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
import { Suspense } from "react";
import { noto } from "../../layout";
import PostDeleteDialog from "@/components/feature/post/PostDeleteDialog";
import { auth } from "@/auth";

interface IParams {
  postId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const { postId } = params;

  const [session, post] = await Promise.all([
    auth(),
    getPostById(postId),
  ]);

  const currentUser = session?.user

  if (!post) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4 w-full">
      <div>
        <div className="sticky top-28 space-y-4">
          <iframe
            width="560"
            height="315"
            className="w-full h-auto aspect-video"
            src={`https://www.youtube.com/embed/${post.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between">
            <Button className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)] text-white">
              <Link
                href={`https://www.youtube.com/watch?v=${post.videoId}`}
                target="_blank"
              >
                Youtubeで視聴する
              </Link>
            </Button>
            <Suspense fallback={<SkeletonReactionButtonList />}>
              <ReactionButtonList postId={postId} />
            </Suspense>
          </div>
        </div>
      </div>
      <div>
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
            {post.detailComment && (
              <pre className={cn("mt-4 whitespace-pre-wrap", noto.className)}>
                {post.detailComment}
              </pre>
            )}
            <Separator className="my-4" />
            <CommentArea postId={post.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
