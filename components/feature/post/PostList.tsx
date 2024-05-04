import getPosts from "@/app/action/getPosts"
import { Suspense } from "react"
import PostItem from "./PostItem"
import SkeltonPostItem from "./SkeltonPostItem"
import PostPagination from "./PostPagination"
import getTotalPosts from "@/app/action/getTotalPosts"

const PostList = async () => {
  const currentPage = 1
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
  )
}

export default PostList