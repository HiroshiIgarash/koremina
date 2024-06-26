import getCurrentUser from "@/app/action/getCurrentUser"
import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId"
import RecentPostItem from "./RecentPostItem"

const RecentPostList = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return

  const recentPosts = await getRecentPostsByUserId({ userId: currentUser.id })

  return (
    <>
      {
        recentPosts.length > 0 ? recentPosts.map(post => (
          <RecentPostItem
            key={post.id}
            postId={post.id}
            videoId={post.videoId}
            comment={post.comment}
            livers={post.liver}
            reactionsCount={post._count}
          />
        )) : (
          <p>あなたの推しを布教するときにおすすめしたい動画を投稿しましょう！</p>
        )
      }
    </>

  )
}

export default RecentPostList