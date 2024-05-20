"use client";

import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Settings, BookmarkIcon, Popcorn } from "lucide-react";
import Avatar from "./Avatar";
import SignOutButton from "./SignOutButton";
import { Button } from "./ui/button";
import Link from "next/link";
import { Liver, User } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";

interface HeaderPopoverProps {
  children: ReactNode;
  currentUser: User & { mostFavoriteLiver: Liver | null } & {
    favoriteLivers: Liver[];
  };
}

const HeaderPopover = ({ children, currentUser }: HeaderPopoverProps) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar user={currentUser} />
        </PopoverTrigger>
        <PopoverContent className="w-fit flex flex-col">
          <PopoverClose asChild>
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/setting/">
                <Settings className="mr-2 w-4 h-4" />
                設定
              </Link>
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button asChild variant="ghost" className="justify-start">
              <Link href="/bookmark/">
                <BookmarkIcon className="mr-2 w-4 h-4" />
                ブックマーク
              </Link>
            </Button>
          </PopoverClose>
          {children}
        </PopoverContent>
      </Popover>
      <Button asChild>
        <Link href="/post">投稿する</Link>
      </Button>
    </>
  );
};

export default HeaderPopover;
