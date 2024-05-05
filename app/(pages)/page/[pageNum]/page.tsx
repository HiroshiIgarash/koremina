import getPosts from "@/app/action/getPosts"
import getTotalPosts from "@/app/action/getTotalPosts"
import PostFilter from "@/components/feature/post/PostFilter"
import PostItem from "@/components/feature/post/PostItem"
import PostPagination from "@/components/feature/post/PostPagination"
import SkeltonPostItem from "@/components/feature/post/SkeltonPostItem"
import { Suspense } from "react"

interface IParams {
  pageNum: string,
}
interface ISearchParams {
  liver: string
}

const Page = async ({ params, searchParams }: { params: IParams, searchParams?: ISearchParams }) => {

  const filterLiver = searchParams?.liver

  const currentPage = parseInt(params.pageNum)
  const postsPerPage = 16

  const posts = await getPosts({ skip: (currentPage - 1) * postsPerPage, take: postsPerPage, filterLiver })
  const totalPosts = await getTotalPosts({ filterLiver })


  return (
    <>
      <PostFilter filterLiversId={filterLiver} />
      {
        posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
              {posts.map(post => (
                <Suspense key={post.id} fallback={<SkeltonPostItem />}>
                  <PostItem
                    id={post.id}
                    comment={post.comment}
                    videoId={post.videoId}
                    postedUserName={post.postedUser.nickname || post.postedUser.name}
                    postedUser={post.postedUser}
                    livers={post.liver}
                    reactionsCount={post._count}
                  />
                </Suspense>
              ))}
            </div>
            <div className="mt-8">
              <PostPagination
                showPages={5}
                currentPage={currentPage}
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
              />
            </div>
          </>

        ) : (
            <p className="grow text-center text-xl leading-loose">
              投稿はまだありません😭<br />
              おすすめの動画を投稿して盛り上げていきましょう！
            </p>
        )
      }
    </>
  )

}

export default Page