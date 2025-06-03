import { auth } from "@/auth";
import BookmarkButton from "./BookMarkButton";
import getBookmarkInfoByPostId from "@/app/action/getBookmarkInfoByPostId";

interface PostBookmarkButtonProps {
  postId: string;
}

export default async function PostBookmarkButton({
  postId,
}: PostBookmarkButtonProps) {
  const session = await auth();
  const currentUser = session?.user;
  if (!currentUser?.id) return null;

  const post = await getBookmarkInfoByPostId(postId);
  if (!post) return null;

  return (
    <button>
      <BookmarkButton
        postId={postId}
        userId={currentUser.id}
        bookmarkedUsersId={post.Bookmark.map((b) => b.userId)}
        seenUsersId={post.seenUsers.map((u) => u.id)}
      />
    </button>
  );
}
