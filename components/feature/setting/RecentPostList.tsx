import getCurrentUser from "@/app/action/getCurrentUser"
import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId"
import RecentPostItem from "./RecentPostItem"

const RecentPostList = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return

  const recentPosts = await getRecentPostsByUserId({ userId: currentUser.id })

  return (
    <>
      {recentPosts.map(post => (
        <RecentPostItem
          key={post.id}
          postId={post.id}
          videoId={post.videoId}
          comment={post.comment}
          livers={post.liver}
        />
      ))}
    </>

  )
}

export default RecentPostList