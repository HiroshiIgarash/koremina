import { auth } from "@/auth";
import RevalidateNotifications from "@/components/RevalidateNotifications";
import prisma from "@/lib/db";
import { NotificationType } from "@/types/type";
import { cacheTag, cacheLife } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const getNotifications = async (userId: string) => {
  "use cache";
  cacheTag(`get-notifications-${userId}`);
  cacheLife("seconds");

  return prisma.notification.findMany({
    where: { userId },
    include: { post: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
};

const generateMessage = (type: NotificationType, arg?: string) => {
  switch (type) {
    case "reaction":
      return `「${arg}」にリアクションがつきました！`;
    case "comment":
      return `「${arg}」にコメントがつきました！`;
    default:
      return `エラーが発生しました。お問い合わせください。`;
  }
};

/**
 * 通知リスト本体
 * auth() を Suspense 内に閉じ込め、見出しを静的シェルとして残す
 */
const NotificationList = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const notifications = await getNotifications(session.user.id);

  return (
    <>
      {notifications.some(notification => !notification.isRead) && (
        <RevalidateNotifications />
      )}
      <div className="space-y-4">
        {notifications.length ? (
          notifications.map(notification => {
            const createdAt = new Date(notification.createdAt);
            const year = createdAt.getFullYear();
            const month = String(createdAt.getMonth() + 1).padStart(2, "0");
            const day = String(createdAt.getDate()).padStart(2, "0");

            const formattedCreatedAt = `${year}-${month}-${day}`;
            const DisplayCreatedAt = `${year}年${month}月${day}日`;

            return (
              <Link
                key={notification.id}
                className="relative block border p-4 rounded-lg hover:border-sky-300 hover:bg-sky-50 dark:hover:bg-accent transition"
                href={`/post/${notification.postId}`}
              >
                {!notification.isRead && (
                  <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-4">
                    <span className="block absolute t-0 left-0 bg-green-400 rounded-full size-4"></span>
                    <span className="block animate-ping size-4 bg-green-400 rounded-full"></span>
                  </span>
                )}
                <time className="text-sm" dateTime={formattedCreatedAt}>
                  {DisplayCreatedAt}
                </time>
                <br />
                {/* 通知作成後に投稿が削除された場合、post が null になるためフォールバック表示 */}
                {generateMessage(
                  notification.type as NotificationType,
                  notification.post?.comment || "削除された投稿"
                )}
              </Link>
            );
          })
        ) : (
          <p>
            通知はありません。
            <br />
            投稿にリアクションやコメントがつくとこちらに表示されます。
          </p>
        )}
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className="px-4 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-16">通知一覧</h1>
      <Suspense
        fallback={
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        }
      >
        <NotificationList />
      </Suspense>
    </div>
  );
};

export default Page;
