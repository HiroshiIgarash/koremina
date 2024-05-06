import PostFilter from "@/components/feature/post/PostFilter"
import PostList from "@/components/feature/post/PostList"

interface IParams {
  pageNum: string,
}
interface ISearchParams {
  liver: string,
  page:string
}

const Page = ({ searchParams }: { params: IParams, searchParams?: ISearchParams }) => {

  const filterLiver = searchParams?.liver

  const currentPage = parseInt(searchParams?.page || '1')
  const postsPerPage = 16

  return (
    <>
      <PostFilter filterLiversId={filterLiver} />
      <PostList
        filterLiver={filterLiver}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
      />
    </>
  )

}

export default Page