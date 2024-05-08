import getPosts from "@/app/action/getPosts"
import { Suspense } from "react"
import PostItem from "./PostItem"
import SkeltonPostItem from "./SkeltonPostItem"
import PostPagination from "./PostPagination"
import getTotalPosts from "@/app/action/getTotalPosts"

interface PostListProps {
  filterLiver: string | undefined
  currentPage: number
  postsPerPage: number
}

const PostList = async ({filterLiver,currentPage,postsPerPage}:PostListProps) => {
  const posts = await getPosts({ skip: (currentPage - 1) * postsPerPage, take: postsPerPage, filterLiver })
  const totalPosts = await getTotalPosts({ filterLiver })


  return (
    <>
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
                filterLiver={filterLiver}
              />
            </div>
          </>

        ) : (
            <p className="p-4 grow text-center text-xl leading-loose">
              投稿はまだありません😭<br />
              おすすめの動画を投稿して盛り上げていきましょう！
            </p>
        )
      }
    </>
  )
}

export default PostList