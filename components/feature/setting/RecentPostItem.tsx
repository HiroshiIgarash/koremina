import { Reaction } from "@/types/type";
import getYoutubeTitleById from "@/utils";
import { Liver } from "@prisma/client";
import RecentPostItemPresentation from "./RecentPostItemPresentation";

interface RecentPostItemProps {
  postId: string;
  videoId: string;
  comment: string;
  livers: Liver[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
  bookmarkCount: number;
}

/**
 * 最近の投稿アイテムのコンテナ コンポーネント
 * データ取得を担当し、RecentPostItemPresentationに渡す
 */
const RecentPostItem = async ({
  postId,
  videoId,
  comment,
  livers,
  reactionsCount,
  bookmarkCount,
}: RecentPostItemProps) => {
  // 動画タイトルの取得
  const title = await getYoutubeTitleById(videoId);

  return (
    <RecentPostItemPresentation
      postId={postId}
      videoId={videoId}
      comment={comment}
      livers={livers}
      reactionsCount={reactionsCount}
      bookmarkCount={bookmarkCount}
      videoTitle={title.error ? null : title}
      isError={!!title.error}
    />
  );
};

export default RecentPostItem;
