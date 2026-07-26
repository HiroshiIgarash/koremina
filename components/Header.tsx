import Link from "next/link";
import HeaderRight from "./HeaderRight";
import { Suspense } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Hamburger from "./Hamburger";

// ローカル開発中に誤って本番DBへ書き込むのを防ぐための警告表示条件。
// 本番DB（Neon の verceldb）は接続文字列のDB名で判定する。
const isConnectedToProdDb =
  process.env.NODE_ENV === "development" &&
  !!process.env.DATABASE_URL?.includes("verceldb");

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
        {isConnectedToProdDb && (
          <span className="text-red-600 font-bold">本番DB接続中</span>
        )}
        <Suspense>
          <HeaderRight />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
