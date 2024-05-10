import getCurrentUser from "@/app/action/getCurrentUser";
import getPostById from "@/app/action/getPostById";
import { auth } from "@/auth";
import Avatar from "@/components/Avatar";
import CommentArea from "@/components/feature/comment/CommentArea";
import BookmarkButton from "@/components/feature/post/BookMarkButton";
import ReactionButton from "@/components/feature/post/ReactionButton";
import ReactionButtonList from "@/components/feature/post/ReactionButtonList";
import SkeletonReactionButton from "@/components/feature/post/SkeletonReactionButton";
import SkeletonReactionButtonList from "@/components/feature/post/SkeletonReactionButtonList";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface IParams {
  postId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const { postId } = params;
  const currentUser = await getCurrentUser();

  const post = await getPostById(postId);

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
          <div className="flex flex-col space-y-4 md:flex-row justify-between">
            <Button className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)]">
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
          {currentUser && (
            <button className="absolute top-4 right-4">
              <BookmarkButton
                postId={postId}
                active={post.bookmarkedUser.some(
                  (u) => u.id === currentUser.id
                )}
              />
            </button>
          )}
          <CardHeader className="space-y-4 pb-0">
            <CardTitle className="leading-tight">
              <div>{post.comment}</div>
            </CardTitle>
            <div className="flex items-center gap-2 my-8">
              <Avatar user={post.postedUser} size={32} />
              <p className="text-sm">
                {post.postedUser.nickname || post.postedUser.name}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {post.detailComment && (
              <pre className="mt-4 whitespace-pre-wrap">
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
