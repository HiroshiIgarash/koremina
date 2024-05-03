import { auth } from "@/auth"
import FavoriteLiversArea from "@/components/feature/setting/FavoriteLiversArea"
import RecentPostArea from "@/components/feature/setting/RecentPostArea"
import SkeletonUserInfo from "@/components/feature/setting/SkeletonUserInfo"
import UserInfo from "@/components/feature/setting/UserInfo"
import { redirect } from "next/navigation"
import { Suspense } from "react"

const Page = async () => {

  const session = await auth()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 space-y-8">
      <Suspense fallback={<SkeletonUserInfo />}>
        <UserInfo />
      </Suspense>

      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4 items-start">
        <FavoriteLiversArea />
        <RecentPostArea />
      </div>
    </div >
  )
}

export default Page