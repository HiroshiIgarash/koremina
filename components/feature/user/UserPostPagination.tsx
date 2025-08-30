import FlexiblePagination from "@/components/shared/FlexiblePagination";

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
  const generateHref = (page: number) => {
    return `/user/${userId}/posts?page=${page}`;
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