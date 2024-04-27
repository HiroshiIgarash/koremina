import getCurrentUser from "@/app/action/getCurrentUser"
import getRecentPostsByUserId from "@/app/action/getRecentPostsByUserId"
import Avatar from "@/components/Avatar"
import SignOutButton from "@/components/SignOutButton"
import ChangeNicknameDialog from "@/components/feature/setting/ChangeNicknameDialog"
import ChannelIcon from "@/components/feature/setting/ChannelIcon"
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
      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
        <div className="border text-center p-4">
          最推しライバー
          <div className="flex justify-center">
            <ChannelIcon channelId="@AngeKatrina" size={112} quality="medium" />
          </div>

          推しライバー
          <div className="flex justify-center -space-x-1">
            <ChannelIcon channelId="@InuiToko" />
            <ChannelIcon channelId="@LizeHelesta" />
            <ChannelIcon channelId="@AngeKatrina" />
            <ChannelIcon channelId="@AngeKatrina" />
            <ChannelIcon channelId="@AngeKatrina" />
          </div>


        </div>
        <RecentPostList currentUser={currentUser} />
      </div>
    </div >
  )
}

export default Page