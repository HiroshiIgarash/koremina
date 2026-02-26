import { auth } from "@/auth";
import prisma from "@/lib/db";
import { cacheTag, cacheLife } from "next/cache";
import Link from "next/link";
import { Button } from "./ui/button";

const getNotReadNotification = async (userId: string) => {
  "use cache";
  cacheTag(`get-notifications-${userId}`);
  cacheLife("seconds");

  return prisma.notification.findFirst({
    where: {
      userId,
      isRead: false,
    },
  });
};

const NotificationField = async () => {
  const session = await auth();
  if (!session?.user?.id) return;

  const notReadNotification = await getNotReadNotification(session.user.id);

  return (
    <>
      {notReadNotification && (
        <Button asChild variant="outline" size="lg">
          <Link href="/notification" className="relative">
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-4">
              <span className="block absolute t-0 left-0 bg-green-400 rounded-full size-4"></span>
              <span className="block animate-ping size-4 bg-green-400 rounded-full"></span>
            </span>
            <p>未読の通知があります</p>
          </Link>
        </Button>
      )}
    </>
  );
};

export default NotificationField;
