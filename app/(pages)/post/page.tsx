import { auth, signIn } from "@/auth";
import PostForm from "@/components/feature/post/PostForm";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 認証済みの投稿フォーム
 * auth() を Suspense 内に閉じ込める
 */
const AuthenticatedPostForm = async () => {
  const session = await auth();
  if (!session) {
    await signIn(undefined, { redirectTo: "/post" });
  }
  return <PostForm />;
};

const Page = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <AuthenticatedPostForm />
      </Suspense>
    </div>
  );
};

export default Page;
