import FlexiblePagination from "@/components/shared/FlexiblePagination";
import { Route } from "next";

interface PaginationProps {
  showPages?: number;
  currentPage: number;
  totalPosts: number;
  postsPerPage: number;
  q: string;
}

const SearchPagination = ({
  showPages = 5,
  currentPage,
  totalPosts,
  postsPerPage,
  q,
}: PaginationProps) => {
  const generateHref = (page: number): Route => {
    const params = new URLSearchParams();
    params.set("q", q);
    params.set("page", page.toString());
    return `/search?${params.toString()}`;
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

export default SearchPagination;
