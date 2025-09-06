import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId";
import RecentPostItem from "./RecentPostItem";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface RecentPostListProps {
  user: User;
}

const RecentPostList = async ({ user }: RecentPostListProps) => {
  // 最新10件+1件取得して、11件目があるかチェック
  const recentPosts = await getRecentPostsByUserId({
    userId: user.id,
    count: 11,
  });

  const displayPosts = recentPosts.slice(0, 10);
  const hasMorePosts = recentPosts.length > 10;

  return (
    <>
      {displayPosts.length > 0 ? (
        <>
          {displayPosts.map(post => (
            <RecentPostItem
              key={post.id}
              postId={post.id}
              videoId={post.videoId}
              comment={post.comment}
              livers={post.liver}
              reactionsCount={post._count}
              bookmarkCount={post._count.Bookmark}
            />
          ))}
          {hasMorePosts && (
            <div className="flex justify-center pt-4">
              <Button variant="ghost" asChild>
                <Link href={`/user/${user.id}/posts`}>もっと見る</Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>投稿はありません</p>
      )}
    </>
  );
};

export default RecentPostList;
