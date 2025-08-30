import FlexiblePagination from "@/components/ui/FlexiblePagination";

interface PaginationProps {
  showPages?: number;
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  filterLiver?: string;
}

const PostPagination = ({
  showPages = 5,
  currentPage,
  totalPosts,
  postsPerPage,
  filterLiver,
}: PaginationProps) => {
  const generateHref = (page: number) => {
    return `/page?page=${page}${filterLiver ? `&liver=${filterLiver}` : ""}`;
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

export default PostPagination;
