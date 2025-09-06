import getCurrentUser from "@/app/action/getCurrentUser";
import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId";
import RecentPostItem from "./RecentPostItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const RecentPostList = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return;

  // 最新10件+1件取得して、11件目があるかチェック
  const recentPosts = await getRecentPostsByUserId({
    userId: currentUser.id,
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
                <Link href={`/user/${currentUser.id}/posts`}>もっと見る</Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>あなたの推しを布教するときにおすすめしたい動画を投稿しましょう！</p>
      )}
    </>
  );
};

export default RecentPostList;
