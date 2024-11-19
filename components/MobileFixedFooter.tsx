import { auth } from "@/auth"
import { BellIcon, BookmarkIcon, SettingsIcon, HomeIcon, Smile } from "lucide-react"
import Link from "next/link"

const MobileFixedFooter = async () => {
  const session = await auth();

  if (!session) return

  return (
    <>
      <div className="md:hidden sticky bottom-0 border-t shadow-2xl w-full bg-background">
        <div className="flex h-16">
          <Link href="/" className="flex-1 flex flex-col justify-center items-center text-xs hover:bg-accent"><HomeIcon /><span>TOP</span></Link>
          <Link href="/notification" className="flex-1 flex flex-col justify-center items-center text-xs hover:bg-accent"><BellIcon /><span>通知</span></Link>
          <Link href="/livers" className="flex-1 flex flex-col justify-center items-center text-xs hover:bg-accent"><Smile /><span>ライバー</span></Link>
          <Link href="/bookmark" className="flex-1 flex flex-col justify-center items-center text-xs hover:bg-accent"><BookmarkIcon /><span>ブックマーク</span></Link>
          <Link href="/setting" className="flex-1 flex flex-col justify-center items-center text-xs hover:bg-accent"><SettingsIcon /><span>設定</span></Link>
        </div>
        <div className="w-full h-4 border-t bg-accent"></div>
      </div>
    </>
  )
}

export default MobileFixedFooter