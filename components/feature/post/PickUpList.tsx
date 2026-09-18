import { Suspense } from "react";
import PostItem from "./PostItem";
import SkeletonPostItem from "./SkeletonPostItem";
import prisma from "@/lib/db";
import { getRandomPostIds as getRandomPostIdsSQL } from "@prisma/client/sql";
import { cacheTag, cacheLife } from "next/cache";
import { connection } from "next/server";

// 1000 * 60 * 60 * 12 ミリ秒 = 12時間ごとに 1 つ進むバケット番号
const PICK_UP_BUCKET_MS = 1000 * 60 * 60 * 12;

const getCurrentBucket = () => Math.floor(Date.now() / PICK_UP_BUCKET_MS);

const getPickUpPosts = async (bucket: number) => {
  "use cache";
  // get-post はリアクションやブックマークのたびに無効化されるため、ここでは使わない。
  // 12 時間バケットの間は DB に到達させないことを優先し、投稿の削除だけを
  // deletePost 側から明示的に反映させる。
  cacheTag("get-pickup-post");
  // bucket が変わるまで再取得しない。時間ベースで再検証すると 1 時間ごとに
  // DB を起こすことになるため、バケット番号をキャッシュキーに含めて
  // 12 時間ごとに 1 回だけ DB に到達させる。
  cacheLife("max");

  // -1 ~ 1 におさめるため、sinを用いる
  const seed = Math.sin(bucket);

  // ランダムに投稿を取得（id, detailComment）
  const randomPosts = await prisma.$queryRawTyped(
    getRandomPostIdsSQL(seed, 10)
  );

  // detailComment が多い順に4つ取得
  const pickUpRandomPosts = randomPosts
    .toSorted(
      (a, b) =>
        (b.detailComment?.length || 0) - (a.detailComment?.length || 0) ||
        (b.rand || 0) - (a.rand || 0)
    )
    .slice(0, 4);

  const randomPostIds = pickUpRandomPosts.map(post => post.id);

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
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
          Bookmark: true,
        },
      },
    },
  });

  return posts;
};

const PickUpList = async () => {
  // Birthday と同じ理由で、現在時刻を読む前に connection() を待つ
  await connection();

  const posts = await getPickUpPosts(getCurrentBucket());

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
                bookmarkCount={post._count.Bookmark}
                reactionsCount={post._count}
              />
            </Suspense>
          );
        })}
      </div>
    </>
  );
};

export default PickUpList;
