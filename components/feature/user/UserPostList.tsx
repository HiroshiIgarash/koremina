import getUserPosts from "@/app/action/getUserPosts";
import getTotalUserPosts from "@/app/action/getTotalUserPosts";
import { Suspense } from "react";
import PostItem from "../post/PostItem";
import SkeletonPostItem from "../post/SkeletonPostItem";
import UserPostPagination from "./UserPostPagination";

interface UserPostListProps {
  userId: string;
  currentPage: number;
  postsPerPage: number;
}

const UserPostList = async ({
  userId,
  currentPage,
  postsPerPage,
}: UserPostListProps) => {
  const [posts, totalPosts] = await Promise.all([
    getUserPosts({
      userId,
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),
    getTotalUserPosts({ userId }),
  ]);

  return (
    <>
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl mx-auto">
            {posts.map(post => (
              <Suspense key={post.id} fallback={<SkeletonPostItem />}>
                <PostItem
                  id={post.id}
                  comment={post.comment}
                  videoId={post.videoId}
                  postedUserName={
                    post.postedUser.nickname || post.postedUser.name
                  }
                  postedUser={post.postedUser}
                  livers={post.liver}
                  bookmark={post.Bookmark}
                  reactionsCount={post._count}
                  seenUsersId={post.seenUsers.map(u => u.id)}
                />
              </Suspense>
            ))}
          </div>
          <div className="mt-8">
            <UserPostPagination
              showPages={5}
              currentPage={currentPage}
              totalPosts={totalPosts}
              postsPerPage={postsPerPage}
              userId={userId}
            />
          </div>
        </>
      ) : (
        <p className="grid place-items-center p-4 grow text-center text-xl leading-loose">
          投稿はまだありません😭
          <br />
          おすすめの動画を投稿して盛り上げていきましょう！
        </p>
      )}
    </>
  );
};

export default UserPostList;
