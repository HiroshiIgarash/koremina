"use client";

import { Menu, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet } from "./ui/sheet";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const Hamburger = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="md:max-w-[300px]">
        <div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-4 w-full justify-start font-bold text-lg"
          >
            <Image
              src={Logo}
              alt=""
              className="w-6 md:w-auto"
              width={32}
              height={32}
            />
            コレミナ
          </Link>
        </div>
        <ul className="mt-8">
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link onClick={() => setOpen(false)} href="/notification">
                通知
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link onClick={() => setOpen(false)} href="/about">
                コレミナについて
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link onClick={() => setOpen(false)} href="/history">
                更新履歴
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link onClick={() => setOpen(false)} href="/policy">
                プライバシーポリシー
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link onClick={() => setOpen(false)} href="/faq">
                FAQ
              </Link>
            </Button>
          </li>
          <li>
            <Button
              asChild
              variant="ghost"
              className="px-4 py-4 w-full justify-start"
            >
              <Link
                onClick={() => setOpen(false)}
                href="https://forms.gle/qi3w8h1Ao6HDJbyJA"
                target="_blank"
              >
                お問い合わせ
                <ExternalLink
                  className="inline-block ml-1"
                  width={12}
                  height={12}
                />
              </Link>
            </Button>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default Hamburger;
