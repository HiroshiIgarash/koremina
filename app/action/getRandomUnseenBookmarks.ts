import prisma from "@/lib/db";
import { getRandomUnseenBookmarks as getRandomUnseenBookmarksSQL } from "@prisma/client/sql";

interface IParam {
  userId: string;
  seed?: number;
  limit?: number;
}

/**
 * 未視聴ブックマークをランダムに取得する最適化された関数
 * Prisma Typed SQLを使用してタイプセーフなクエリを実行
 * 
 * @param userId - ユーザーID
 * @param seed - ランダムシード（省略時は現在時刻ベース）
 * @param limit - 取得する件数（デフォルト4件）
 * @returns 未視聴ブックマークの配列
 */
const getRandomUnseenBookmarks = async ({ userId, seed, limit = 4 }: IParam) => {
  // ランダムシードを生成（-1 ~ 1の範囲）
  const randomSeed = seed ?? Math.sin(Math.floor(Date.now() / (1000 * 60 * 60 * 12)));

  // Prisma Typed SQLを使用して未視聴ブックマークのpostIdをランダムに取得
  const randomUnseenBookmarkIds = await prisma.$queryRawTyped(
    getRandomUnseenBookmarksSQL(userId, randomSeed, limit)
  );

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