import { Suspense } from "react";
import PostItem from "./PostItem";
import SkeletonPostItem from "./SkeletonPostItem";
import prisma from "@/lib/db";
import { getRandomPostIds as getRandomPostIdsSQL } from "@prisma/client/sql";

const getRandomPostIds = async ({
  seed = Math.sin(Date.now()),
  limit = 10,
}) => {
  // ランダムに投稿を取得（id, detailComment）
  const randomPosts = await prisma.$queryRawTyped(
    getRandomPostIdsSQL(seed, limit)
  );

  // detailComment が多い順に4つ取得
  const pickUpRandomPosts = randomPosts
    .toSorted(
      (a, b) =>
        (b.detailComment?.length || 0) - (a.detailComment?.length || 0) ||
        (b.rand || 0) - (a.rand || 0)
    )
    .slice(0, 4);

  return pickUpRandomPosts.map(post => post.id);
};

const PickUpList = async () => {
  // 1000 * 60 * 60 * 12 ミリ秒 = 12時間ごとにseedが変わる
  // -1 ~ 1 におさめるため、sinを用いる
  const seed = Math.sin(Math.floor(Date.now() / (1000 * 60 * 60 * 12)));

  const randomPostIds = await getRandomPostIds({ seed });

  const posts = await prisma.video.findMany({
    where: {
      id: {
        in: randomPostIds,
      },
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true,
        },
      },
      Bookmark: true,
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
        },
      },
      seenUsers: true,
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
        {posts.map(post => {
          if (!post) return;
          return (
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
          );
        })}
      </div>
    </>
  );
};

export default PickUpList;
