import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId";
import RecentPostItem from "./RecentPostItem";
import { User } from "@prisma/client";

interface RecentPostListProps {
  user: User;
}

const RecentPostList = async ({ user }: RecentPostListProps) => {
  const recentPosts = await getRecentPostsByUserId({ userId: user.id });

  return (
    <>
      {recentPosts.length > 0 ? (
        recentPosts.map((post) => (
          <RecentPostItem
            key={post.id}
            postId={post.id}
            videoId={post.videoId}
            comment={post.comment}
            livers={post.liver}
            reactionsCount={post._count}
          />
        ))
      ) : (
        <p>投稿はありません</p>
      )}
    </>
  );
};

export default RecentPostList;
