import Link from "next/link";
import HeaderRight from "./HeaderRight";
import { Suspense } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Hamburger from "./Hamburger";

const Header = () => {
  return (
    <header className="sticky top-0 w-full py-4 px-4 md:px-12 border-b shadow-sm z-50 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Hamburger />
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt=""
              className="w-6 md:w-auto"
              width={32}
              height={32}
            />
            <h1 className="md:text-xl font-bold">コレミナ</h1>
          </Link>
        </div>
        <Suspense>
          <HeaderRight />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
