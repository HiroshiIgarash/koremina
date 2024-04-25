import { auth, signIn } from "@/auth"
import { Button } from "./ui/button"
import SignInButton from "./SignInButton"
import Image from "next/image"
import SignOutButton from "./SignOutButton"
import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "./Avatar"
import Link from "next/link"

const Header = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="fixed w-full py-4 px-8 md:px-12 border-b shadow z-50 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1>KOREMINA</h1>
        </div>
        <div className="flex items-center gap-2">
          {
            currentUser ? (
              <>
                <Avatar user={currentUser} />
                <Button asChild>
                  <Link href="/post">投稿する</Link>
                </Button>
                {/* <SignOutButton /> */}
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