import { Metadata } from "next";

export const metadata: Metadata = {
  title: "更新履歴",
};

const Page = () => {
  return (
    <>
      <div className="px-4 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-16">更新履歴</h1>
        <div className="space-y-8">
          <div>
            <time dateTime="2024-07-05" className="font-bold">
              2024/07/05
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                PickUpセクションの更新時間がアメリカ時間になっていたため修正しました。
              </li>
              <li>
                コメントからユーザーページに飛べるよう修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-04" className="font-bold">
              2024/07/04
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                TOPページにPickUpセクションを設けました。<br />午前・午後の12時に更新されます。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-03" className="font-bold">
              2024/07/03
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                通知ページを作成しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-01" className="font-bold">
              2024/07/01
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                YouTube Data APIの呼び出し回数を効率化しました
              </li>
              <li>
                投稿ページ詳細のページタイトルを「投稿タイトル | コレミナ」に変更しました
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-06-30" className="font-bold">
              2024/06/30
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                一定のアクセス数でサムネやユーザーアイコンの画像が表示されなくなる不具合を修正しました
              </li>
              <li>投稿フォームに注釈を追加しました</li>
              <li>
                推しライバーを多数選択しようとすると画面が覆われて選択できなくなる不具合を修正（推しライバーの欄がスクロールできるようにしました）
              </li>
              <li>ランダム表示で対象外のライバーが抽選される不具合を修正しました</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-06-29" className="font-bold">
              2024/06/29
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                コレミナ -にじさんじおすすめ動画共有サービス（非公式）-
                を正式にリリースしました！
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-06-12" className="font-bold">
              2024/06/12
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>Google Search Console に登録しました！</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
