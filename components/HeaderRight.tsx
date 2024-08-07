import getCurrentUser from "@/app/action/getCurrentUser";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import HeaderPopover from "./HeaderPopover";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { FaGithub } from "react-icons/fa6";

const HeaderRight = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex items-center gap-2">
      <Link href="https://github.com/HiroshiIgarash/koremina" target="_blank" className="mr-4 hidden md:block">
        <FaGithub size={32} />
      </Link>
      <ModeToggle />
      {currentUser ? (
        <HeaderPopover currentUser={currentUser}>
          <SignOutButton className="w-full" variant="ghost" />
        </HeaderPopover>
      ) : (
        <>
          <SignInButton className="px-0" variant="link" size="sm">
            ログイン
          </SignInButton>
          <Button asChild size="sm">
            <Link href="/post">投稿する</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
