import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FlexiblePaginationProps {
  showPages?: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  generateHref: (page: number) => string;
}

const FlexiblePagination = ({
  showPages = 5,
  currentPage,
  totalItems,
  itemsPerPage,
  generateHref,
}: FlexiblePaginationProps) => {
  const pageEnd = Math.ceil(totalItems / itemsPerPage);

  // ページが1ページ以下の場合はページネーションを表示しない
  if (pageEnd <= 1) return null;

  const showPageStart = currentPage - (showPages - 1) / 2; // 表示するページネーションの左端（０、負含む）
  const showPageEnd = currentPage + (showPages - 1) / 2; // 表示するページネーションの右端（MAXを超えた場合もカウント）

  //表示するページネーションを格納した配列の生成
  let showPageArr: number[] = [];
  for (let page = showPageStart; page <= showPageEnd; page++) {
    if (page < 1 || page > pageEnd) continue;
    showPageArr.push(page);
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={generateHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {showPageStart > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {showPageArr.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href={generateHref(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showPageEnd < pageEnd && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {currentPage < pageEnd && (
          <PaginationItem>
            <PaginationNext href={generateHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default FlexiblePagination;