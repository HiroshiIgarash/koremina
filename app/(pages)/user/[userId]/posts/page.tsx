import getUserById from "@/app/action/getUserById";
import UserPostList from "@/components/feature/user/UserPostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Page = async (props: PageProps<"/user/[userId]/posts">) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { userId } = params;

  const user = await getUserById(userId);

  if (!user) notFound();

  const currentPage = parseInt(
    Array.isArray(searchParams?.page)
      ? searchParams.page[0] || "1"
      : searchParams?.page || "1"
  );
  const postsPerPage = 16;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/user/${userId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            ユーザーページに戻る
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          {user.nickname || user.name}さんの投稿一覧
        </h1>
        <p className="text-muted-foreground">
          {user.nickname || user.name}さんが投稿したおすすめ動画の一覧です
        </p>
      </div>

      <Suspense fallback={<SkeletonPostList />}>
        <UserPostList
          userId={userId}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      </Suspense>
    </div>
  );
};

export default Page;
