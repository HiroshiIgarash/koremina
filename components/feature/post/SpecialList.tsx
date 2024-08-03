import { Suspense } from "react"
import PostItem from "./PostItem"
import SkeltonPostItem from "./SkeltonPostItem"
import prisma from "@/lib/db"


const SpecialList = async () => {


  const posts = await prisma.video.findMany({
    where: {
      liver: {
        some: {
          name: "鈴谷アキ" 
        }
      }
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
    orderBy: {
      postedAt: 'desc'
    }
  })

  return (
    <>
      <div className="overflow-x-auto w-[100vw] md:w-auto">
      <div className="flex [&>*]:w-[calc(100vw_-_4rem)] [&>*]:shrink-0 md:[&>*]:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
        {posts.map((post) => {
          if (!post) return
          return (
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
          )
        })}
      </div>
      </div>
    </>
  )
}

export default SpecialList