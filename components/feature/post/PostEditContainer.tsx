import getPostById from "@/app/action/getPostById";
import PostEditForm from "./PostEditForm";
import { notFound } from "next/navigation";

interface PostEditContainerProps {
  postId: string;
}

const PostEditContainer = async ({ postId }: PostEditContainerProps) => {
  const post = await getPostById(postId);

  if (!post) notFound();

  return (
    <PostEditForm
      postId={postId}
      videoId={post?.videoId}
      comment={post.comment}
      detailComment={post.detailComment || ""}
      liver={post.liver}
    />
  );
};

export default PostEditContainer;
