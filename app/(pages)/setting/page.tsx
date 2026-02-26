import { auth } from "@/auth";
import Award from "@/components/feature/setting/Award";
import FavoriteLiversArea from "@/components/feature/setting/FavoriteLiversArea";
import RecentPostArea from "@/components/feature/setting/RecentPostArea";
import SkeletonUserInfo from "@/components/feature/setting/SkeletonUserInfo";
import UserInfo from "@/components/feature/setting/UserInfo";
import NotificationSettings from "@/components/feature/setting/NotificationSettings";
import getCurrentUser from "@/app/action/getCurrentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * 設定ページの本体コンテンツ
 * auth() を Suspense 内に閉じ込め、外枠を静的シェルとして残す
 */
const SettingContent = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <>
      <Suspense fallback={<SkeletonUserInfo />}>
        <UserInfo />
      </Suspense>

      <NotificationSettings user={currentUser} />

      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4 items-start">
        <FavoriteLiversArea />
        <div className="flex flex-col gap-y-4">
          <Award />
          <RecentPostArea />
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 space-y-8">
      <Suspense
        fallback={
          <div className="space-y-8">
            <SkeletonUserInfo />
            <Skeleton className="h-48 w-full" />
          </div>
        }
      >
        <SettingContent />
      </Suspense>
    </div>
  );
};

export default Page;
