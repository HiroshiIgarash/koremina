import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";

/**
 * 指定したpostIdの投稿に関するBookmark情報と視聴済みユーザー情報を取得する
 *
 * updateBookmark / updateSeenUsers の updateTag と対応させている。
 * 時間ベースの再検証に頼るとアイドル中もDBを起こし続けるため、失効はタグだけに任せる。
 */
export default async function getBookmarkInfoByPostId(postId: string) {
  "use cache";
  cacheTag(`bookmark-info:${postId}`);
  cacheLife("max");

  const post = await prisma.video.findUnique({
    where: { id: postId },
    select: {
      Bookmark: { select: { userId: true } },
      seenUsers: { select: { id: true } },
    },
  });

  return post;
}
