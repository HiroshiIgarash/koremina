import getPosts from "@/app/action/getPosts"
import getTotalPosts from "@/app/action/getTotalPosts"
import PostItem from "@/components/feature/post/PostItem"
import PostPagination from "@/components/feature/post/PostPagination"
import SkeltonPostItem from "@/components/feature/post/SkeltonPostItem"
import { Suspense } from "react"

interface IParams {
  pageNum: string
}

const Page = async ({ params }: { params: IParams }) => {
  const currentPage = parseInt(params.pageNum)
  const postsPerPage = 16

  console.time("getPosts")
  const posts = await getPosts({ skip: (currentPage - 1) * postsPerPage, take: postsPerPage })
  console.timeEnd("getPosts")
  const totalPosts = await getTotalPosts()


  return (
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
              reactions={{
                good: post.good,
                bad: post.bad,
                love: post.love,
                funny: post.funny,
                cry: post.cry,
                angel: post.angel
              }}
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
  )

}

export default Page