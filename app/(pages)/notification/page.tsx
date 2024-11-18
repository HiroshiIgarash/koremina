
import { auth } from "@/auth"
import RevalidateNotifications from "@/components/RevalidateNotifications"
import prisma from "@/lib/db"
import { NotificationType } from "@/types/type"
import { unstable_cache } from "next/cache"
import Link from "next/link"
import { redirect } from "next/navigation"

const Page = async () => {

  const session = await auth()

  if (!session?.user?.id) {
    redirect('/')
  }

  const getCachedNotifications = unstable_cache(
    async (userId) => {
      return await prisma.notification.findMany({
        where: {
          userId
        },
        include: {
          post: true
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20
      })
    },
    [`get-notifications-${session.user.id}`],
    { tags: [`get-notifications-${session.user.id}`] }
  )

  const notifications = await getCachedNotifications(session.user.id)

  const generateMessage = (type: NotificationType, arg?: string) => {
    switch (type) {
      case 'reaction':
        return `「${arg}」にリアクションがつきました！`
      case 'comment':
        return `「${arg}」にコメントがつきました！`
      default:
        return `エラーが発生しました。お問い合わせください。`
    }
  }

  return (
    <>
      {notifications.some(notification => !notification.isRead) && (
        <RevalidateNotifications />
      )}
      <div className="px-4 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-16">通知一覧</h1>
        <div className="space-y-4">
          {notifications.length ?
            notifications.map(notification => {
              const createdAt = new Date(notification.createdAt);
              const year = createdAt.getFullYear();
              const month = String(createdAt.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
              const day = String(createdAt.getDate()).padStart(2, '0');

              const formattedCreatedAt = `${year}-${month}-${day}`;
              const DisplayCreatedAt = `${year}年${month}月${day}日`;

              return (
                <Link key={notification.id} className="relative block border p-4 rounded-lg hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition" href={`/post/${notification.postId}`}>
                  {
                    !notification.isRead && (
                      <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-4">
                        <span className="block absolute t-0 left-0 bg-green-400 rounded-full size-4"></span>
                        <span className="block animate-ping size-4 bg-green-400 rounded-full"></span>
                      </span>
                    )
                  }
                  <time className="text-sm" dateTime={formattedCreatedAt}>{DisplayCreatedAt}</time><br />
                  {generateMessage(notification.type as NotificationType, notification.post?.comment || '')}
                </Link>
              )
            }
            ) : (
              <p>通知はありません。<br />投稿にリアクションやコメントがつくとこちらに表示されます。</p>
            )}
        </div>
      </div>
    </>
  )
}

export default Page