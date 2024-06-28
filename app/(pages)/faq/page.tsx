import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
}

const Page = () => {
  return (
    <div className="px-4 w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-16">FAQ</h1>
      <div className="space-y-16">

        <div>
          <h2 className="font-bold text-2xl">アカウントについて</h2>
          <Separator className="my-4" />
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl mb-2">アカウント画像を変えたい</h3>
              <p className="text-muted-foreground">
                設定ページからアカウント画像をクリックすることで変更できます。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">アカウント画像を変える時にうまく範囲を選択できない</h3>
              <p className="text-muted-foreground">
                スマホやタブレットなどのタッチデバイスで操作する場合、一本指で操作するようにしてください。ピンチアウトなど２本指を用いた操作を行うとうまく選択できません。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">ログインするアカウントを変更したい</h3>
              <p className="text-muted-foreground">
                ブラウザ版の Google もしくは X からログアウトすることで、別のアカウントでコレミナにログインすることができます。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">アカウントを削除したい</h3>
              <p className="text-muted-foreground">
                設定ページに記載されている「ユーザーID」、管理人とやり取りするためのメールアドレスをお問い合わせよりご連絡ください。<br />
                本人確認のため設定ページのスクショなどを提供いただく場合がございます。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl">投稿について</h2>
          <Separator className="my-4" />
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl mb-2">なにを投稿すればいいかわからない</h3>
              <p className="text-muted-foreground">
                かたくならず、気軽に投稿して構いません！参考として、いくつか例を挙げます<br />
                ・あなたが「〜ってどの動画を見るのがおすすめ？」と言われたときにおすすめしたい動画<br />
                ・推しになったきっかけの動画<br />
                ・あなたが何回も見てしまう動画<br />
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">にじさんじ以外の人も出ている動画でもいい？</h3>
              <p className="text-muted-foreground">
                大丈夫です。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">投稿画面の「このライバーを推すときにおすすめしたい！」には、動画に登場するライバー全員登録したほうがいい？</h3>
              <p className="text-muted-foreground">
                いいえ、全員を登録する必要はありません。あなたが「このライバーを推すときにこの動画を紹介するな」とおもったライバーを登録すればOKです。とはいえ、迷ってしまったら全員登録して構いません。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">動画のURLを貼り付けてもエラー文が表示される</h3>
              <p className="text-muted-foreground">
                動画が削除されているか、もしくは対応していないURLです。URLに含まれる動画ID(11文字)を入力することで投稿できるようになります。対応していないURLがあった場合、お問い合わせよりURLをご連絡いただけると助かります。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">投稿タイトルってなにを書けばいい？</h3>
              <p className="text-muted-foreground">
                その動画に対する感想や、それがあなたにとってどういう動画か、などを書くと良いかと思います。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">明らかに関係のない動画が投稿されている</h3>
              <p className="text-muted-foreground">
                投稿のページにある「通報する」をクリックして通報をお願いします。（ログインしていない場合は非表示になっています。）管理人が確認し不適切と判断した場合削除いたします。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl">ライバーについて</h2>
          <Separator className="my-4" />
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl mb-2">このライバーがいないんだけど？</h3>
              <p className="text-muted-foreground">
                現在登録されているライバーは、2024年5月31日現在におけるにじさんじ公式ライバー、にじさんじEN公式ライバー、およびにじさんじJPの元ライバーとなります。追加してほしいライバーがいましたらお問い合わせよりご相談いただければと思います。
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-bold text-2xl">その他</h2>
          <Separator className="my-4" />
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-xl mb-2">この機能をつけて欲しい</h3>
              <p className="text-muted-foreground">
                フッターのお問い合わせよりご連絡ください。
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">不具合がある</h3>
              <p className="text-muted-foreground">
                フッターのお問い合わせよりご連絡ください。状況をくわしく説明していただけると助かります。
              </p>
            </div>
          </div>
        </div>





      </div>
    </div>
  )
}

export default Page