import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "@/components/Avatar"
import SignOutButton from "@/components/SignOutButton"
import ChangeNicknameDialog from "@/components/feature/setting/ChangeNicknameDialog"
import FavoriteLiversArea from "@/components/feature/setting/FavoriteLiversArea"
import RecentPostList from "@/components/feature/setting/RecentPostList"
import { SquarePen } from "lucide-react"
import { redirect } from "next/navigation"

const Page = async () => {

  const currentUser = await getCurrentUser()


  if (!currentUser) {
    redirect('/')
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 space-y-8">
      <div className="flex items-center gap-2">
        <Avatar user={currentUser} size={48} />
        <span>{currentUser?.nickname}</span>
        <ChangeNicknameDialog user={currentUser}>
          <SquarePen size='1em' />
        </ChangeNicknameDialog>
        <div className="ml-8">
          <SignOutButton />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4 items-start">
        <FavoriteLiversArea />
        <RecentPostList currentUser={currentUser} />
      </div>
    </div >
  )
}

export default Page