import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-full px-4">
      <p className="font-bold text-3xl">
        お探しのページは
        <br className="md:hidden" />
        見つかりませんでした。
      </p>
      <p className="mt-10">ページが削除された可能性があります。</p>
      <Button asChild className="mt-20">
        <Link href="/">トップページへ戻る</Link>
      </Button>
    </div>
  );
};

export default Page;
