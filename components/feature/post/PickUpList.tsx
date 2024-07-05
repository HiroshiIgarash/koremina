import { Suspense } from "react"
import PostItem from "./PostItem"
import SkeltonPostItem from "./SkeltonPostItem"
import prisma from "@/lib/db"
import getPosts from "@/app/action/getPosts"
import getTotalPosts from "@/app/action/getTotalPosts"
import { unstable_cache } from "next/cache"
import getPostById from "@/app/action/getPostById"

// 次の12時までの秒数を計算
const calcSecondsUntilNext12 = () => {
  const now = new Date();
  now.setHours(now.getHours() + 9) //JP時刻
  const currentHour = now.getHours();

  const next12Hour = currentHour < 12 ? 12 : 24;

  const target = new Date(now);
  target.setHours(next12Hour, 0, 0, 0);

  return Math.floor((target.getTime() - now.getTime()) / 1000);
}

const revalidateTime = calcSecondsUntilNext12()

// 投稿IDをランダムに取得（個数10未満）
const getRandomPostsId = unstable_cache(async () => {
  const posts: Awaited<ReturnType<typeof getPosts>> = []
  const totalPosts = await getTotalPosts()

  // posts に 重複を含む10件を取得
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * totalPosts)
    const p = await getPosts({ skip: index, take: 1 })
    posts.push(...p)
  }

  // 重複を排除
  const uniqueRandomPosts = posts.filter((post, index, self) => self.findIndex(p => p.id === post.id) === index);

  const pickUpRandomPosts = uniqueRandomPosts.toSorted((a, b) => (b.detailComment?.length || 0) - (a.detailComment?.length || 0)).slice(0, 4)

  return pickUpRandomPosts.map(p => p.id)
}, ['pickup'], { revalidate: revalidateTime,tags:['post-pickup'] })




const PickUpList = async () => {

  const randomPostsId = await getRandomPostsId()

  const posts = await prisma.video.findMany({
    where: {
      id: {
        in: randomPostsId
      },
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
    }
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
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
    </>
  )
}

export default PickUpList