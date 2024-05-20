import getCurrentUser from "@/app/action/getCurrentUser";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import HeaderPopover from "./HeaderPopover";
import Link from "next/link";
import { Button } from "./ui/button";

const HeaderRight = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex items-center gap-2">
      {currentUser ? (
        <HeaderPopover currentUser={currentUser}>
          <SignOutButton className="w-full" variant="ghost" />
        </HeaderPopover>
      ) : (
        <>
          <SignInButton variant="link">ログイン</SignInButton>
          <Button asChild>
            <Link href="/post">投稿する</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderRight;
