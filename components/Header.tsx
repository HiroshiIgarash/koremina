import { Button } from "./ui/button"
import SignInButton from "./SignInButton"
import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "./Avatar"
import Link from "next/link"

const Header = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="sticky top-0 w-full py-4 px-8 md:px-12 border-b shadow z-50 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1>KOREMINA</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {
            currentUser ? (
              <>
                <Link href="/setting">
                  <Avatar user={currentUser} />
                </Link>
                <Button asChild>
                  <Link href="/post">投稿する</Link>
                </Button>
              </>
            ) : (
              <SignInButton />
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header