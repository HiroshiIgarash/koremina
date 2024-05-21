"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || undefined;

  const handleLogin = (provider: "google" | "twitter") => {
    signIn(provider, { callbackUrl });
  };

  return (
    <>
      <div className="px-8 w-full">
        <h1 className="text-3xl font-bold mb-8">ログイン</h1>
        <ul className="w-full space-y-4 py-8">
          <li>
            <Button
              variant="outline"
              onClick={()=>handleLogin("google")}
              className="rounded-full w-full"
            >
              <Image
                src="/google-logo.svg"
                alt=""
                width={40}
                height={40}
                // className="mr-2 w-4 aspect-square"
              />
              Googleでログイン
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              onClick={()=>handleLogin("twitter")}
              className="rounded-full w-full"
            >
              <Image
                src="/x-logo-black.png"
                alt=""
                width={16}
                height={16}
                className="mr-2 w-4 aspect-square"
              />
              Xでログイン
            </Button>
          </li>
        </ul>
        <h2 className="font-bold text-lg mt-8">コレミナにログインすると<br />次の機能が使えるようになります。</h2>
        <ul className="list-disc list-inside mt-2">
          <li>おすすめ動画の投稿</li>
          <li>投稿へのコメント</li>
          <li>投稿のブックマーク</li>
          <li>投稿へのリアクション</li>
          <li>推しライバー、最推しライバーの登録（ライバー絞り込みがしやすくなります。）</li>
          
        </ul>
      </div>
    </>
  );
};

export default Page;
