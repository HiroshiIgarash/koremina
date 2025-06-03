import prisma from "@/lib/db";

/**
 * 指定したpostIdの投稿に関するBookmark情報と視聴済みユーザー情報を取得する
 */
export default async function getBookmarkInfoByPostId(postId: string) {
  const post = await prisma.video.findUnique({
    where: { id: postId },
    select: {
      Bookmark: { select: { userId: true } },
      seenUsers: { select: { id: true } },
    },
  });

  return post;
}
