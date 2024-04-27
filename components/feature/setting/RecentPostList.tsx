import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import RecentPostItem from './RecentPostItem'
import getRecentPostsByUserId from '@/app/action/getRecentPostsByUserId'
import { User } from '@prisma/client'
import { Suspense } from 'react'
import SkeletonRecentPostItem from './SkeletonRecentPostItem'

interface RecentPostListProps {
  currentUser: User
}

const RecentPostList = async ({ currentUser }: RecentPostListProps) => {

  const recentPosts = await getRecentPostsByUserId({ userId: currentUser.id })

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の投稿</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 px-4 max-w-7xl mx-auto">

        <Suspense fallback={<SkeletonRecentPostItem />}>
          {recentPosts.map(post => (
            <RecentPostItem
              key={post.id}
              postId={post.id}
              videoId={post.videoId}
              comment={post.comment}
            />
          ))}
        </Suspense>

      </CardContent>
    </Card>
  )
}

export default RecentPostList