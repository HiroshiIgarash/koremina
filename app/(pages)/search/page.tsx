import PostItem from "@/components/feature/post/PostItem"
import SearchForm from "@/components/feature/post/SearchForm"
import SearchPagination from "@/components/feature/post/SearchPagination"
import SkeltonPostItem from "@/components/feature/post/SkeltonPostItem"
import prisma from "@/lib/db"
import { redirect } from "next/navigation"
import { Suspense } from "react"

interface ISearchParams {
  q: string
  page: string
}

const Page = async ({ searchParams }: { searchParams?: ISearchParams }) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const postsPerPage = 16;

  if (!searchParams) {
    redirect('/')
  }

  const searchList = searchParams.q.split(' ').filter(s => s !== '')

  const count = await prisma.video.count({
    where: {
      OR: [
        {
          OR: searchList.map(word => ({
            comment: { contains: word }
          }))
        },
        {
          OR: searchList.map(word => ({
            detailComment: { contains: word }
          }))
        },
      ]
    }
  })

  const posts = await prisma.video.findMany({
    where: {
      OR: [
        {
          OR: searchList.map(word => ({
            comment: { contains: word }
          }))
        },
        {
          OR: searchList.map(word => ({
            detailComment: { contains: word }
          }))
        },
      ]
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true,
        },
      },
      Bookmark: true,
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
        },
      },
    },
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  })


  return (
    <>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="font-bold mb-4 px-4 w-full max-w-7xl mx-auto">ワードで検索</h2>
        <SearchForm defaultValue={searchParams.q.toString()} />
      </div>
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
            {posts.map((post) => (
              <Suspense key={post.id} fallback={<SkeltonPostItem />}>
                <PostItem
                  id={post.id}
                  comment={post.comment}
                  videoId={post.videoId}
                  postedUserName={
                    post.postedUser.nickname || post.postedUser.name
                  }
                  postedUser={post.postedUser}
                  livers={post.liver}
                  bookmark={post.Bookmark}
                  reactionsCount={post._count}
                />
              </Suspense>
            ))}
          </div>
          <div className="mt-8">
            <SearchPagination
              showPages={5}
              currentPage={currentPage}
              totalPosts={count}
              postsPerPage={postsPerPage}
              q={searchParams.q}
            />
          </div>
        </>
      ) : (
        <p>「{searchParams.q.toString()}」の検索結果はありません。</p>
      )}
    </>
  )
}

export default Page