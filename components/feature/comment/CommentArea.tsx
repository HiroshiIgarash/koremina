import getCurrentUser from "@/app/action/getCurrentUser";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { Suspense } from "react";
import SkeletonCommentList from "./SkeletonCommentList";
import { getCachedPostById } from "@/app/(pages)/post/[postId]/_utils/functions";

interface CommentAreaProps {
  postId: string;
}

const CommentArea = async ({ postId }: CommentAreaProps) => {
  const currentUser = await getCurrentUser();
  const post = await getCachedPostById(postId);

  if (!post) return null;

  return (
    <>
      <p className="font-bold">この投稿に対するコメント</p>
      {currentUser && (
        <div className="mt-4">
          <CommentForm user={currentUser} postId={postId} />
        </div>
      )}
      <div className="mt-4 space-y-4">
        <Suspense fallback={<SkeletonCommentList />}>
          <CommentList
            postId={postId}
            currentUser={currentUser}
            videoId={post.videoId}
          />
        </Suspense>
      </div>
    </>
  );
};

export default CommentArea;
