import { Bookmark, Video } from "@prisma/client";
import { Suspense } from "react";
import PostItem from "../post/PostItem";
import PostPagination from "../post/PostPagination";
import SkeltonPostItem from "../post/SkeltonPostItem";
import getBookmarksById from "@/app/action/getBookmarksById";

interface BookmarkListProps {
  bookmarks: Awaited<ReturnType<typeof getBookmarksById>>;
}

const BookmarkList = ({ bookmarks }: BookmarkListProps) => {
  return (
    <>
      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
          {bookmarks.map((bookmark) => {
            const { post } = bookmark;
            return (
              <Suspense key={post.id} fallback={<SkeltonPostItem />}>
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
      ) : (
        <p className="p-4 grow text-center text-xl leading-loose">
          ブックマークははまだありません😭
          <br />
          気になる動画はブックマークに登録していきましょう！
        </p>
      )}
    </>
  );
};

export default BookmarkList;
