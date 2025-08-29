import prisma from "@/lib/db";

interface IParam {
  userId: string;
  seed?: number;
  limit?: number;
}

interface RandomUnseenBookmarkResult {
  bookmark_id: string;
  postId: string;
  rand: number;
}

/**
 * 未視聴ブックマークをランダムに取得する最適化された関数
 * 
 * @param userId - ユーザーID
 * @param seed - ランダムシード（省略時は現在時刻ベース）
 * @param limit - 取得する件数（デフォルト4件）
 * @returns 未視聴ブックマークの配列
 */
const getRandomUnseenBookmarks = async ({ userId, seed, limit = 4 }: IParam) => {
  // ランダムシードを生成（-1 ~ 1の範囲）
  const randomSeed = seed ?? Math.sin(Math.floor(Date.now() / (1000 * 60 * 60 * 12)));

  // 未視聴ブックマークのpostIdをランダムに取得
  const randomUnseenBookmarkIds = await prisma.$queryRaw<RandomUnseenBookmarkResult[]>`
    SELECT b.id as bookmark_id, b."postId", rand
    FROM (
      SELECT (SELECT setseed(${randomSeed})::text), b.id, b."postId", random() AS rand 
      FROM "Bookmark" b
      INNER JOIN "Video" v ON b."postId" = v.id
      WHERE b."userId" = ${userId}
      AND NOT EXISTS (
        SELECT 1 FROM "_seenVideos" sv 
        WHERE sv."A" = v.id AND sv."B" = ${userId}
      )
    ) as random_unseen
    ORDER BY rand
    LIMIT ${limit}
  `;

  if (randomUnseenBookmarkIds.length === 0) {
    return [];
  }

  // 必要な投稿データのみを取得
  const posts = await prisma.video.findMany({
    where: {
      id: {
        in: randomUnseenBookmarkIds.map(item => item.postId),
      },
    },
    include: {
      postedUser: true,
      liver: true,
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

  // ブックマーク形式に変換
  return randomUnseenBookmarkIds.map(item => {
    const post = posts.find(p => p.id === item.postId);
    return {
      id: item.bookmark_id,
      userId,
      postId: item.postId,
      post,
    };
  }).filter(bookmark => bookmark.post !== undefined);
};

export default getRandomUnseenBookmarks;