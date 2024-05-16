import Link from "next/link";
import HeaderRight from "./HeaderRight";
import { Suspense } from "react";

const Header = () => {


  return (
    <header className="sticky top-0 w-full py-4 px-8 md:px-12 border-b shadow z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1>KOREMINA</h1>
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
