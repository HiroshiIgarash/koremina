import { Metadata } from "next";

export const metadata: Metadata = {
  title: "更新履歴",
};

const Page = () => {
  return (
    <>
      <div className="px-4 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-16">更新履歴</h1>
        <div className="space-y-4">
          <div>
            <time dateTime="2024-06-30" className="font-bold">2024/06/30</time><br /> 
            <p>
              一定のアクセス数でサムネやユーザーアイコンの画像が表示されなくなる不具合を修正<br />
              投稿フォームに注釈を追加しました<br />
              推しライバーを多数選択しようとすると画面が覆われて選択できなくなる不具合を修正（推しライバーの欄がスクロールできるようにしました）<br />
              ランダム表示で対象外のライバーが抽選される不具合を修正
            </p>
          </div>
          <div>
            <time dateTime="2024-06-29" className="font-bold">2024/06/29</time><br /> 
            <p>コレミナ -にじさんじおすすめ動画共有サービス（非公式）- を正式にリリースしました！</p>
          </div>
          <div>
            <time dateTime="2024-06-12" className="font-bold">2024/06/12</time><br /> 
            <p>Google Search Console に登録しました！</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
