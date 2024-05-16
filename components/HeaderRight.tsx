import getCurrentUser from "@/app/action/getCurrentUser";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Settings, BookmarkIcon } from "lucide-react";
import Avatar from "./Avatar";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";
import Link from "next/link";

const HeaderRight = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex items-center gap-2">
      {currentUser ? (
        <>
          <Popover>
            <PopoverTrigger>
              <Avatar user={currentUser} />
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col">
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/setting/">
                  <Settings className="mr-2 w-4 h-4" />
                  設定
                </Link>
              </Button>
              <Button asChild variant="ghost" className="justify-start">
                <Link href="/bookmark/">
                  <BookmarkIcon className="mr-2 w-4 h-4" />
                  ブックマーク
                </Link>
              </Button>
              <SignOutButton className="w-full" variant="ghost" />
            </PopoverContent>
          </Popover>
          <Button asChild>
            <Link href="/post">投稿する</Link>
          </Button>
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default HeaderRight;
