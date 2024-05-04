import getPosts from "@/app/action/getPosts"
import { Suspense } from "react"
import PostItem from "./PostItem"
import SkeltonPostItem from "./SkeltonPostItem"
import PostPagination from "./PostPagination"

const PostList = async () => {
  const page = 2
  const postsPerPage = 4

  const posts = await getPosts({ skip: (page - 1) * postsPerPage, take: postsPerPage })
  // const postsCount = await getPostsCount()


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
      {/* <div>総ポスト：{postsCount}</div> */}
      <PostPagination
        showPages={5}
        currentPage={1}
        totalPosts={39}
        postsPerPage={4}
      />
    </>
  )
}

export default PostList