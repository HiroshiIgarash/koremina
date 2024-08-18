import { auth } from "@/auth"
import { BellIcon, BookmarkIcon, SettingsIcon } from "lucide-react"
import Link from "next/link"

const MobileFixedFooter = async() => {
  const session = await auth();

  if (!session) return
  
  return (
    <div className="flex md:hidden sticky bottom-0 border-t shadow-xl w-full h-20 bg-background">
      <Link href="/notification" className="flex-1 flex flex-col justify-center items-center text-sm"><BellIcon /><span>通知</span></Link>
      <Link href="/bookmark" className="flex-1 flex flex-col justify-center items-center text-sm"><BookmarkIcon /><span>ブックマーク</span></Link>
      <Link href="/setting" className="flex-1 flex flex-col justify-center items-center text-sm"><SettingsIcon /><span>設定</span></Link>
    </div>
  )
}

export default MobileFixedFooter