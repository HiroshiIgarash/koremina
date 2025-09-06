import { auth } from "@/auth";
import getYoutubeTitleById from "@/utils";
import PostItemPresentation from "./PostItemPresentation";
import { Reaction } from "@/types/type";
import { Bookmark, User } from "@prisma/client";

interface PostItemProps {
  id: string;
  comment: string;
  videoId: string;
  postedUserName: string | null;
  postedUser: User;
  livers: { name: string }[];
  bookmark: Bookmark[];
  seenUsersId: string[];
  reactionsCount: { [k in Reaction]: Number } & { comments: Number };
}

/**
 * 投稿アイテムのコンテナ コンポーネント
 * データ取得を担当し、PostItemPresentationに渡す
 */
const PostItem = async ({
  id,
  comment,
  videoId,
  postedUserName,
  postedUser,
  livers,
  bookmark,
  reactionsCount,
  seenUsersId,
}: PostItemProps) => {
  // 認証情報と動画タイトルの取得
  const [session, title] = await Promise.all([
    auth(),
    getYoutubeTitleById(videoId),
  ]);

  return (
    <PostItemPresentation
      id={id}
      comment={comment}
      videoId={videoId}
      postedUserName={postedUserName}
      postedUser={postedUser}
      livers={livers}
      bookmark={bookmark}
      seenUsersId={seenUsersId}
      reactionsCount={reactionsCount}
      videoTitle={title.error ? null : title}
      currentUserId={session?.user?.id}
      isError={!!title.error}
    />
  );
};

export default PostItem;
