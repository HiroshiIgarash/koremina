import { Button } from "./ui/button";
import SignInButton from "./SignInButton";
import getCurrentUser from "@/app/action/getCurrentUser";
import Avatar from "./Avatar";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SignOutButton from "./SignOutButton";
import { BookmarkIcon, Settings } from "lucide-react";

const Header = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="sticky top-0 w-full py-4 px-8 md:px-12 border-b shadow z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1>KOREMINA</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {currentUser ? (
            <>
              <Popover>
                <PopoverTrigger>
                  <Avatar user={currentUser} />
                </PopoverTrigger>
                <PopoverContent className="w-fit flex flex-col">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/setting/"><Settings className="mr-2 w-4 h-4" />設定</Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/bookmark/"><BookmarkIcon className="mr-2 w-4 h-4" />ブックマーク</Link>
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
      </div>
    </header>
  );
};

export default Header;
