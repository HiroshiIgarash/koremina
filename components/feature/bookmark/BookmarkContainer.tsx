import getBookmarksById from "@/app/action/getBookmarksById";
import getCurrentUser from "@/app/action/getCurrentUser";
import { notFound } from "next/navigation";
import BookmarkList from "./BookmarkList";
import getTotalBookmarksById from "@/app/action/getTotalBookmarksById";
import BookmarkPagination from "./BookmarkPagination";
import { auth } from "@/auth";

interface BookmarkContainerProps {
  currentPage: number;
  postsPerPage: number;
}

const BookmarkContainer = async ({
  currentPage,
  postsPerPage,
}: BookmarkContainerProps) => {
  const session = await auth();

  if (!session?.user?.id) notFound();

  const [bookmarks, totalPosts] = await Promise.all([
    getBookmarksById({
      userId: session.user.id,
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),
    getTotalBookmarksById({ userId: session.user.id }),
  ]);

  return (
    <>
      <BookmarkList bookmarks={bookmarks} />
      <div className="mt-8">
        <BookmarkPagination
          showPages={5}
          currentPage={currentPage}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
        />
      </div>
    </>
  );
};

export default BookmarkContainer;
