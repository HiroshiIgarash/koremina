import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface PaginationProps {
  showPages?: number
  currentPage: number
  totalPosts: number
  postsPerPage: number
  filterLiver?:string
}

const PostPagination = ({ showPages = 5, currentPage, totalPosts, postsPerPage,filterLiver }: PaginationProps) => {

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
              <PaginationPrevious  href={`/page?page=${currentPage - 1}${filterLiver ? `&liver=${filterLiver}`:''}`} />
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
                href={`/page?page=${page}${filterLiver ? `&liver=${filterLiver}`:''}`}
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
              <PaginationNext href={`/page?page=${currentPage + 1}${filterLiver ? `&liver=${filterLiver}`:''}`} />
            </PaginationItem>
          )
        }
      </PaginationContent>
    </Pagination>
  )
}

export default PostPagination