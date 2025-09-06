import ReactionButtonList from "@/components/feature/post/ReactionButtonList";
import SkeletonReactionButtonList from "@/components/feature/post/SkeletonReactionButtonList";
import { Suspense } from "react";
import { auth } from "@/auth";
import ReportDialog from "@/components/feature/post/ReportDialog";
import XShareButton from "@/components/feature/post/XShareButton";
import SkeletonButton from "@/components/feature/post/SkeletonButton";
import PostDetailCard from "@/components/feature/post/PostDetailCard";
import PostVideo from "@/components/feature/post/PostVideo";
import YoutubeLinkButton from "@/components/feature/post/YoutubeLinkButton";
import { Skeleton } from "@/components/ui/skeleton";
import { getCachedPostById } from "./_utils/functions";
import SkeletonPostDetailCard from "@/components/feature/post/SkeletonPostDetailCard";

interface IParams {
  postId: string;
}

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

  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4 w-full">
      <div>
        <div className="sticky top-28 space-y-4">
          <Suspense fallback={<Skeleton className="aspect-video" />}>
            <PostVideo postId={postId} />
          </Suspense>
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <Suspense fallback={<SkeletonButton />}>
                <YoutubeLinkButton postId={postId} />
              </Suspense>
              <Suspense fallback={<SkeletonButton />}>
                <XShareButton postId={postId} />
              </Suspense>
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
        <Suspense fallback={<SkeletonPostDetailCard />}>
          <PostDetailCard postId={postId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
