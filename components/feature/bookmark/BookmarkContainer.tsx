import getBookmarksById from "@/app/action/getBookmarksById";
import getCurrentUser from "@/app/action/getCurrentUser";
import { notFound } from "next/navigation";
import BookmarkList from "./BookmarkList";
import getTotalBookmarksById from "@/app/action/getTotalBookmarksById";
import BookmarkPagination from "./BookmarkPagination";

interface BookmarkContainerProps {
  currentPage: number;
  postsPerPage: number;
}

const BookmarkContainer = async ({
  currentPage,
  postsPerPage,
}: BookmarkContainerProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) notFound();

  const bookmarks = await getBookmarksById({
    userId: currentUser.id,
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  const totalPosts = await getTotalBookmarksById({userId:currentUser.id});

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
