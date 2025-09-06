import getUserById from "@/app/action/getUserById";
import RecentPostArea from "@/components/feature/user/RecentPostArea";
import SkeletonUserInfo from "@/components/feature/setting/SkeletonUserInfo";
import FavoriteLiversArea from "@/components/feature/user/FavoriteLiversArea";
import UserInfo from "@/components/feature/user/UserInfo";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const Page = async (props: PageProps<"/user/[userId]">) => {
  const params = await props.params;
  const { userId } = params;

  const user = await getUserById(userId);

  if (!user) notFound();

  return (
    <div className="max-w-7xl mx-auto w-full px-4 space-y-8">
      <h1 className="text-3xl font-bold">ユーザーページ</h1>
      <Suspense fallback={<SkeletonUserInfo />}>
        <UserInfo user={user} />
      </Suspense>

      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4 items-start">
        <FavoriteLiversArea user={user} />
        <RecentPostArea user={user} />
      </div>
    </div>
  );
};

export default Page;
