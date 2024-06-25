import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コレミナについて",
};

const Page = () => {
  return (
    <div className="px-4 w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">コレミナについて</h1>
      <h2 className="text-5xl text-center">
        コレミナは
        <br />
        <span className="text-[#2A4B71]">にじさんじ</span>の<br />
        おすすめ動画を
        <br />
        共有できるサービスです！
      </h2>

      <section>
        <h3 className="text-center text-4xl">こんなときに便利！</h3>
        <div className="p-2 border-4 border-green-400 rounded">
          <p className="text-xl">
            推しについて
            <span className="text-red-400">みんなに知ってほしい！</span>
          </p>
        </div>
        <div className="p-2 border-4 border-green-400 rounded">
          <p className="text-xl">
            気になるライバーがいるから、
            <span className="text-red-400">動画を見てみたい！</span>
          </p>
        </div>
        <div className="p-2 border-4 border-green-400 rounded">
          <p className="text-xl">
            にじさんじを知ったばかり！
            <span className="text-red-400">何から見よう...？</span>
          </p>
        </div>
      </section>
      <section>
        <h3 className="text-center text-4xl">コレミナの使い方</h3>
        <h4>登録編</h4>
        <p>右上のログインボタンから登録しよう！GoogleアカウントかXアカウントがあればOK！登録はすぐ終わるよ！</p>
        <h4>投稿編</h4>
        <p>右上の投稿ボタンから投稿しよう！おすすめのYoutube動画のURLをコピーしてね！</p>
        <h4>設定編</h4>
        <p>設定ページから最推し、推しを設定できるよ！推しを設定すると動画を探しやすくなるよ！</p>
      </section>
      <section>
        <p>ここまで読んでくれてありがとう！みんなのおすすめ動画をたくさん教えてね！</p>
        <div className="text-center">
          <p>↓ログインはすぐおわるよ！</p>
          <SignInButton variant="outline" size="lg">
            ログイン
          </SignInButton>
        </div>
        <div className="text-center">
          <p>↓おすすめの動画を教えてね！</p>
          <Button asChild size="lg">
            <Link href="/post">投稿する</Link>
          </Button>
        </div>
      </section>
      
    </div>
  );
};

export default Page;
