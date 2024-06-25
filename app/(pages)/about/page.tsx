import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コレミナについて",
};

const Page = () => {
  return (
    <div className="px-4 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-20 text-center">コレミナについて</h1>
      <h2 className="text-5xl text-center leading-normal">
        コレミナは
        <br />
        <span className="text-[#2A4B71] font-bold">にじさんじ</span>の<br />
        おすすめ動画を
        <br />
        共有できる<br />サービスです！
      </h2>

      <section className="mt-20">
        <h3 className="text-center text-3xl font-bold">こんなときに便利！</h3>
        <div className="mt-12 space-y-8">
          <div className="flex items-center gap-4">
            <div className="p-4 border-4 border-green-400 rounded-2xl">
              <p className="text-xl">
                推しについて
                <span className="text-red-400">みんなに知ってほしい！</span>
              </p>
            </div>
            <Image className="shrink-0" src="/ota_boy.png" alt="" width={90} height={90} />
          </div>
          <div className="flex items-center gap-4">
            <Image className="shrink-0" src="/ota_girl.png" alt="" width={90} height={90} />
            <div className="p-4 border-4 border-green-400 rounded-2xl">
              <p className="text-xl">
                気になるライバーがいるから、
                <span className="text-red-400">動画を見てみたい！</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-4 border-4 border-green-400 rounded-2xl">
              <p className="text-xl">
                にじさんじを知ったばかり！
                <span className="text-red-400">何から見よう...？</span>
              </p>
            </div>
            <Image className="shrink-0" src="/hatena.png" alt="" width={90} height={90} />
          </div>
        </div>
      </section>
      <section className="mt-20">
        <h3 className="text-center text-3xl font-bold">使い方はカンタン！</h3>
        <div className="mt-12 space-y-8">
          <div>
            <h4 className="text-center text-lg font-bold">登録編</h4>
            <p className="mt-4">右上のログインボタンから登録しよう！GoogleアカウントかXアカウントがあればOK！<span className="text-red-400">登録はすぐ終わるよ！</span></p>
          </div>
          <div>
  
          <h4 className="text-center text-lg font-bold">投稿編</h4>
          <p className="mt-4">右上の投稿ボタンから投稿しよう！おすすめのYoutube動画のURLをコピーしてね！</p>
          </div>
          <div>
  
          <h4 className="text-center text-lg font-bold">設定編</h4>
          <p className="mt-4">設定ページから最推し、推しを設定できるよ！推しを設定すると動画を探しやすくなるよ！</p>
          </div>
        </div>
      </section>
      <section className="mt-32">
        <p className="font-bold text-lg text-center">ここまで読んでくれてありがとう！みんなのおすすめ動画をたくさん教えてね！</p>
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <p className="mb-2">↓ログインはすぐおわるよ！</p>
            <SignInButton variant="outline" size="lg">
              ログイン
            </SignInButton>
          </div>
          <div className="text-center">
            <p className="mb-2">↓おすすめの動画を教えてね！</p>
            <Button asChild size="lg">
              <Link href="/post">投稿する</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Page;
