import getPostById from "@/app/action/getPostById";
import { auth } from "@/auth";
import PostEditContainer from "@/components/feature/post/PostEditContainer";
import { redirect } from "next/navigation";

const Page = async (props: PageProps<"/post/edit/[postId]">) => {
  const { postId } = await props.params;
  const session = await auth();
  const post = await getPostById(postId);

  if (!post || !session || post.postedUserId !== session.user?.id) {
    redirect("/");
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <PostEditContainer postId={postId} />
    </div>
  );
};

export default Page;
