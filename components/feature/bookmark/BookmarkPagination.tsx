import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface PaginationProps {
  showPages?: number
  currentPage: number
  totalPosts: number
  postsPerPage: number
}

const BookmarkPagination = ({ showPages = 5, currentPage, totalPosts, postsPerPage }: PaginationProps) => {

  const pageEnd = Math.ceil(totalPosts / postsPerPage)

  const showPageStart = currentPage - (showPages - 1) / 2 // 表示するページネーションの左端（０、負含む）
  const showPageEnd = currentPage + (showPages - 1) / 2 // 表示するページネーションの右端（MAXを超えた場合もカウント）

  //表示するページネーションを格納した配列の生成
  let showPageArr: number[] = []
  for (let page = showPageStart; page <= showPageEnd; page++) {
    if (page < 1 || page > pageEnd) continue
    showPageArr.push(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        {
          currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious  href={`/bookmark?page=${currentPage - 1}`} />
            </PaginationItem>
          )
        }
        {
          showPageStart > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )
        }
        {
          showPageArr.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`/bookmark?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        }
        {
          showPageEnd < pageEnd && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )
        }
        {
          currentPage < pageEnd && (
            <PaginationItem>
              <PaginationNext href={`/bookmark?page=${currentPage + 1}`} />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}

export default BookmarkPagination