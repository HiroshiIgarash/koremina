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
            <time dateTime="2025-10-28" className="font-bold">
              2025/12/28
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                「鈴原るる」を卒業ライバーからにじさんじ所属ライバーに変更しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-10-04" className="font-bold">
              2025/10/04
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                メール通知機能を追加しました。
                <br />
                新規投稿があった際に、メールで通知を受け取れるようになりました。
                <br />
                設定ページから通知用のメールアドレスを登録し、通知のON/OFFを切り替えることができます。
              </li>
              <li>
                設定ページの推しライバー表示の読み込み速度を改善しました。
                <br />
                推しライバーが多い場合でも、スムーズに表示されるようになりました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-09-23" className="font-bold">
              2025/09/23
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                過去に使用した画像をアバターとして再設定した際にエラーが発生する不具合を修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-09-20" className="font-bold">
              2025/09/20
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                「皇れお」「篠宮ゆの」「城瀬いすみ」「花籠つばさ」の4名を追加しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-08-30" className="font-bold">
              2025/08/30
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>設定ページで自己紹介文を設定できる機能を追加しました。</li>
              <li>
                コメントや詳細欄のタイムスタンプをクリックできる機能を追加しました。
                <br />
                タイムスタンプ（例：1:23、12:34、1:23:45）をクリックすると、別タブでYouTubeが開き該当時間から動画が再生されます。
              </li>
              <li>
                ユーザーページの「最近の投稿」を10件表示に変更し、「もっと見る」ボタンで全投稿を確認できるようになりました。
              </li>
              <li>ユーザーの全投稿を一覧で閲覧できるページを追加しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-08-23" className="font-bold">
              2025/08/23
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                誕生日表示機能を改善しました。
                <br />
                今日誕生日のライバーがいない場合、最も近い誕生日のライバーが表示されるようになりました。
                <br />
                また、誕生日までの日数も表示されます。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-08-21" className="font-bold">
              2025/08/21
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                ブックマークページのコンテンツ幅を他のページと統一しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-08-17" className="font-bold">
              2025/08/17
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                スマホでTOPを閲覧した際にレイアウトが崩れる不具合を修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-08-16" className="font-bold">
              2025/08/16
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                「十河ののは」「夜牛詩乃」「蝸堂みかる」「猫屋敷美紅」の4名を追加しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-06-02" className="font-bold">
              2025/06/02
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>投稿詳細ページの表示速度を改善しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-05-06" className="font-bold">
              2025/05/06
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>Google Analyticsを導入しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-04-13" className="font-bold">
              2025/04/13
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                「一橋綾人」「五木左京」「ジール・ギンジョウカ」「フリオドール」「セイブル」「ケイリクス・デボネア」の6名を追加しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-03-08" className="font-bold">
              2025/03/08
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                ダークモードで今日の誕生日ライバーのセクションがみにくい不具合を修正しました。
              </li>
              <li>Youtube埋め込み動画の表示速度を改善しました。</li>
              <li>サムネイルの表示領域を大きくしました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-02-16" className="font-bold">
              2025/02/16
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                推しライバー一覧のレイアウトが崩れる不具合を修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2025-01-09" className="font-bold">
              2025/01/09
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                ライバーのチャンネルアイコンが表示されない不具合を修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-12-27" className="font-bold">
              2024/12/27
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                TOPに誕生日セクションを追加しました。
                <br />
                今日が誕生日のライバーが表示されます。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-12-02" className="font-bold">
              2024/12/02
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>ライバー絞り込みが反応しない不具合を修正しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-11-19" className="font-bold">
              2024/11/19
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>ライバー一覧ページを作成しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-11-18" className="font-bold">
              2024/11/18
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                未読通知のお知らせが一定時間消えない不具合を修正しました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-11-17" className="font-bold">
              2024/11/17
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>トーストがでない不具合を修正しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-11-16" className="font-bold">
              2024/11/16
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>ブックマークされた数を表示させるようにしました。</li>
              <li>
                初回訪問時にはじめましてのモーダルを表示するようにしました。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-10-19" className="font-bold">
              2024/10/19
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                ブックマークに「視聴済み」状態を追加しました。
                <br />
                ブックマーク済みの状態でもう一度タップするとチェックマークのついたブックマークになります。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-10-08" className="font-bold">
              2024/10/08
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>TOPにブックマークセクションを追加しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-09-02" className="font-bold">
              2024/09/02
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>TOPにおすすめ動画の総数を表示するようにしました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-08-18" className="font-bold">
              2024/08/18
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                「七瀬すず菜」「早乙女ベリー」「雲母たまこ」「酒寄颯馬」「渚トラウト」の5名を追加しました。
              </li>
              <li>
                詳細ページでXで共有する際に元動画のタイトルが含まれるように変更しました。
              </li>
              <li>
                ワード検索のアルゴリズムを変更しました。
                <br />
                ワード検索で関連ライバーも検索対象になるよう変更。また、空白区切りでの検索をAND検索に変更。
              </li>
              <li>スマホで閲覧の際に固定フッターを実装しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-25" className="font-bold">
              2024/08/03
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>ワードで検索機能を追加しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-25" className="font-bold">
              2024/07/25
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>TOPページに鈴谷アキ特集を掲載しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-23" className="font-bold">
              2024/07/23
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>GitHubへのリンクを追加しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-06" className="font-bold">
              2024/07/06
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>卒業ライバーに関して、JP以外も追加しました。</li>
              <li>投稿詳細ページに「Xでシェアする」ボタンを追加しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-05" className="font-bold">
              2024/07/05
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                PickUpセクションの更新時間がアメリカ時間になっていたため修正しました。
              </li>
              <li>コメントからユーザーページに飛べるよう修正しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-04" className="font-bold">
              2024/07/04
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>
                TOPページにPickUpセクションを設けました。
                <br />
                午前・午後の12時に更新されます。
              </li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-03" className="font-bold">
              2024/07/03
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>通知ページを作成しました。</li>
            </ul>
          </div>
          <div>
            <time dateTime="2024-07-01" className="font-bold">
              2024/07/01
            </time>
            <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
              <li>YouTube Data APIの呼び出し回数を効率化しました</li>
              <li>
                投稿ページ詳細のページタイトルを「投稿タイトル |
                コレミナ」に変更しました
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
              <li>
                ランダム表示で対象外のライバーが抽選される不具合を修正しました
              </li>
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
