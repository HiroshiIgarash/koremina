import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "@/components/Avatar"
import SignOutButton from "@/components/SignOutButton"
import ChangeNicknameDialog from "@/components/feature/setting/ChangeNicknameDialog"
import ChannelIcon from "@/components/feature/setting/ChannelIcon"
import RecentPostItem from "@/components/feature/setting/RecentPostItem"
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
        <div className="border p-4">
          <p className="text-center">最近の投稿</p>
          <div className="grid grid-cols-1 gap-4 px-4 max-w-7xl mx-auto">

            <RecentPostItem id="k9Eewd8TEWE" />
            <RecentPostItem id="k9Eewd8TEWE" />
            <RecentPostItem id="oKMoybTf-TM" />
            <RecentPostItem id="n7j3bxOwC9Y" />
            <RecentPostItem id="F5uzlCUrFiI" />
            <RecentPostItem id="xMpTFCca9qo" />
            <RecentPostItem id="lAUYSiqJnS8" />
            <RecentPostItem id="WNWMXzZ2_eU" />
            <RecentPostItem id="hG0OMmvC9NE" />
            <RecentPostItem id="JV4KsTf301w" />
        </div>
        </div>
      </div>
    </div >
  )
}

export default Page