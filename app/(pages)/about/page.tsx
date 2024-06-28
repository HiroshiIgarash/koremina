import { auth } from "@/auth";
import SignInButton from "@/components/SignInButton";
import FadeIn from "@/components/feature/scroll/FadeIn";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コレミナについて",
};

const Page = async () => {
  const session = await auth();

  return (
    <div className="px-4 w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-20 text-center">コレミナについて</h1>

      <h2 className="text-5xl md:text-6xl text-center leading-normal md:leading-relaxed">
        <FadeIn display="inline-block" margin="100px">コレミナは</FadeIn>
        <br />
        <FadeIn display="inline-block" margin="100px" delay={0.4}><span className="text-[#2A4B71] font-bold">にじさんじ</span>の</FadeIn><br className="md:hidden" />
        <FadeIn display="inline-block" margin="100px" delay={0.4}>おすすめ動画を</FadeIn>
        <br />
        <FadeIn display="inline-block" margin="100px" delay={0.8}>共有できる</FadeIn><br className="md:hidden" /><FadeIn display="inline-block" margin="100px" delay={1.2}>非公式<br className="md:hidden" />サービスです！</FadeIn>
      </h2>


      <section className="mt-20">
        <h3 className="text-center text-3xl font-bold"><FadeIn>こんなときに便利！</FadeIn></h3>
        <div className="mt-12 space-y-8 max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  推しについて
                  <span className="text-red-400">みんなに知ってほしい！</span>
                </p>
              </div>
              <Image className="shrink-0" src="/ota_boy.png" alt="" width={90} height={90} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <Image className="shrink-0" src="/ota_girl.png" alt="" width={90} height={90} />
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  気になるライバーがいるから、
                  <span className="text-red-400">動画を見てみたい！</span>
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  にじさんじを知ったばかり！
                  <span className="text-red-400">何から見よう...？</span>
                </p>
              </div>
              <Image className="shrink-0" src="/hatena.png" alt="" width={90} height={90} />
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="mt-20">
        <h3 className="text-center text-3xl font-bold"><FadeIn>使い方はカンタン！</FadeIn></h3>
        <div className="mt-12 space-y-8">
          <FadeIn>
            <div>
              <h4 className="text-center text-lg font-bold">登録編</h4>
              <p className="mt-4 text-center">右上のログインボタンから登録しよう！GoogleアカウントかXアカウントがあればOK！<span className="text-red-400">登録はすぐ終わるよ！</span></p>
            </div>
          </FadeIn>
          <FadeIn>

            <div>
              <h4 className="text-center text-lg font-bold">投稿編</h4>
              <p className="mt-4 text-center">右上の投稿ボタンから投稿しよう！<span className="text-red-400">おすすめのYoutube動画のURLをコピーしてね！</span></p>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h4 className="text-center text-lg font-bold">設定編</h4>
              <p className="mt-4 text-center">設定ページから最推し、推しを設定できるよ！<span className="text-red-400">推しを設定すると動画を探しやすくなるよ！</span></p>
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="mt-20">
        <h3 className="text-center text-3xl font-bold"><FadeIn>こんな動画があったら<br className="md:hidden" />投稿しよう！</FadeIn></h3>
        <div className="mt-12 space-y-8 max-w-2xl mx-auto">
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  推しにはまった<span className="text-red-400">きっかけの動画</span>
                </p>
              </div>
              <Image className="shrink-0" src="/ota_boy.png" alt="" width={90} height={90} />
            </div>
          </FadeIn>
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <Image className="shrink-0" src="/ota_girl.png" alt="" width={90} height={90} />
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  ライバーを<span className="text-red-400">推しはじめた人に勧めたい動画</span>
                </p>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="flex justify-center items-center gap-4">
              <div className="flex-1 p-4 md:py-8 border-4 border-green-400 rounded-2xl">
                <p className="text-xl md:text-center">
                  大好きで<span className="text-red-400">何回も見てしまう動画</span>
                </p>
              </div>
              <Image className="shrink-0" src="/vtuber.png" alt="" width={90} height={90} />
            </div>
          </FadeIn>
          <FadeIn><p className="text-right text-xl">などなど...！</p></FadeIn>
        </div>
      </section>
      <section className="mt-32">
        <p className="font-bold text-lg md:text-3xl text-center"><FadeIn display="inline-block">ここまで読んでくれてありがとう！<br className="hidden md:block" />みんなのおすすめ動画をたくさん教えてね！</FadeIn></p>
        <FadeIn margin="0px">
          <div className="mt-12 space-y-8">
            {
              !session && (
                <div className="text-center">
                  <p className="mb-2">↓ログインはすぐおわるよ！</p>
                  <SignInButton variant="outline" size="lg">
                    ログイン
                  </SignInButton>
                </div>
              )
            }
            <div className="text-center">
              <p className="mb-2">↓おすすめの動画を教えてね！</p>
              <Button asChild size="lg">
                <Link href="/post">投稿する</Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Page;
