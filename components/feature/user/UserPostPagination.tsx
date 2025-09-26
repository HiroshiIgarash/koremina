import FlexiblePagination from "@/components/shared/FlexiblePagination";
import { Route } from "next";

interface UserPostPaginationProps {
  showPages?: number;
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  userId: string;
}

const UserPostPagination = ({
  showPages = 5,
  currentPage,
  totalPosts,
  postsPerPage,
  userId,
}: UserPostPaginationProps) => {
  const generateHref = (page: number): Route => {
    return `/user/${userId}/posts?page=${page}` as Route;
  };

  return (
    <FlexiblePagination
      showPages={showPages}
      currentPage={currentPage}
      totalItems={totalPosts}
      itemsPerPage={postsPerPage}
      generateHref={generateHref}
    />
  );
};

export default UserPostPagination;
