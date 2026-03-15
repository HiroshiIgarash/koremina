import { auth } from "@/auth";
import Birthday from "@/components/Birthday";
import FirstVisitDialog from "@/components/FirstVisitDialog";
import NotificationField from "@/components/NotificationField";
import TopBookmarkList from "@/components/feature/bookmark/TopBookMarkList";
import PickUpList from "@/components/feature/post/PickUpList";
import PostFilter from "@/components/feature/post/PostFilter";
import PostFilterContainer from "@/components/feature/post/PostFilterContainer";
import PostList from "@/components/feature/post/PostList";
import SearchForm from "@/components/feature/post/SearchForm";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import SkeletonPickUpList from "@/components/feature/post/SkeletonPickUpList";
import SkeletonTopBookmarkList from "@/components/feature/post/SkeletonTopBookmarkList";
import getTotalPosts from "@/app/action/getTotalPosts";
import { ChevronRight, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const CountPosts = async () => {
  const count = await getTotalPosts();
  return <span className="text-destructive">{count}件</span>;
};

/**
 * 認証状態に応じた表示を担当するコンポーネント
 * auth() を Suspense 内に閉じ込め、静的シェルを汚染しない
 */
const AuthSection = async () => {
  const session = await auth();
  return <>{!session && <FirstVisitDialog />}</>;
};

/**
 * メール通知案内のセッション依存リンク
 */
const SettingLinkOrText = async () => {
  const session = await auth();
  if (session) {
    return (
      <>
        <Link
          href="/setting"
          className="text-blue-600 dark:text-blue-300 underline font-bold"
        >
          設定ページ
        </Link>
        から登録できます
      </>
    );
  }
  return <>ログイン後、設定ページから登録できます</>;
};

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <AuthSection />
      </Suspense>
      {/* Xログイン不具合お知らせバナー */}
      <div className="w-full px-4 mb-6 max-w-7xl mx-auto">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-400 dark:border-yellow-600 rounded-lg text-yellow-800 dark:text-yellow-200">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="font-bold">
              【障害情報】X（Twitter）ログインが現在ご利用いただけません
            </p>
            <p className="text-sm mt-1">
              現在、X（Twitter）アカウントでのログインに不具合が発生しています。
              <br />
              Googleアカウントでのログインはご利用いただけます。ご不便をおかけして申し訳ございません。
            </p>
          </div>
        </div>
      </div>
      <div className="mb-10 text-center">
        <Image
          src="/kv_sp.png"
          className="md:hidden"
          width={800}
          height={420}
          alt="コレミナ -にじさんじおすすめ動画共有サービス（非公式）-"
        />
        <Image
          src="/kv_pc.png"
          className="hidden md:block w-[1000px] max-w-full"
          width={1280}
          height={420}
          alt="コレミナ -にじさんじおすすめ動画共有サービス（非公式）-"
        />
      </div>
      <Birthday />
      <div className="mt-10 mb-10">
        <p className="text-xl font-bold text-center">
          <Suspense fallback={<span className="text-destructive">...件</span>}>
            <CountPosts />
          </Suspense>
          のおすすめ動画が
          <br className="md:hidden" />
          投稿されています!
        </p>
      </div>
      <div className="w-full px-4 mb-8 md:mb-16 space-y-2 md:space-y-0 max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-4">
        <div className="items-center w-full p-4 md:py-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg text-center gap-2 border-2 border-blue-500 shadow-lg">
          <p className="text-destructive font-bold text-xl mb-2">🎉 新機能</p>
          <p className="text-lg font-bold mb-1">メール通知機能を追加！</p>
          <p className="text-sm">
            新着投稿をメールで受け取れるようになりました
            <br />
            <Suspense fallback={<>ログイン後、設定ページから登録できます</>}>
              <SettingLinkOrText />
            </Suspense>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full p-4 md:py-8 bg-accent rounded-lg text-center gap-2">
          <div>
            <p className="text-destructive font-bold">おすすめ！</p>
            <p className="text-lg">
              スマホの方は「ホーム画面に追加」
              <Upload className="shrink-0 inline" size="1em" />
              でURLバーをなくせます
            </p>
          </div>
        </div>
        <Link
          href="/about"
          className="relative flex items-center w-full p-4 md:py-8 border-2 border-[#2A4B71] rounded-lg text-center hover:bg-accent"
        >
          <div className="flex-1">
            <p className="text-lg">初めての方へ</p>
            <p className="font-bold text-xl">コレミナについて</p>
          </div>
          <ChevronRight
            className="absolute top-0 right-4 md:right-2 flex items-center h-full"
            size="2em"
          />
        </Link>
      </div>
      <div className="w-full px-4 mb-8 md:mb-16 max-w-7xl mx-auto text-center md:text-left empty:m-0">
        <Suspense fallback={null}>
          <NotificationField />
        </Suspense>
      </div>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 md:mb-8 px-4 w-full max-w-7xl mx-auto">
          おすすめ動画を探す
        </h2>
        <div className="w-full mb-4 md:mb-16 max-w-7xl mx-auto">
          <Suspense
            fallback={
              <PostFilter
                filterLiversId={undefined}
                livers={[]}
                user={null}
                isPending
              />
            }
          >
            <PostFilterContainer />
          </Suspense>
        </div>
        <div className="w-full mb-8 max-w-7xl mx-auto">
          <h3 className="font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
            ワードで検索
          </h3>
          <SearchForm />
        </div>
      </div>
      <Suspense fallback={<SkeletonTopBookmarkList />}>
        <TopBookmarkList />
      </Suspense>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
          Pick Up!
        </h2>
        <p className="mb-4 px-4 w-full max-w-7xl mx-auto">
          12時間ごとに更新されます。
          <br />
          いい動画だったらリアクションしよう！
        </p>
        <div>
          <Suspense fallback={<SkeletonPickUpList />}>
            <PickUpList />
          </Suspense>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
          新着投稿
        </h2>
      </div>
      <Suspense fallback={<SkeletonPostList />}>
        <PostList currentPage={1} postsPerPage={16} filterLiver={undefined} />
      </Suspense>
    </>
  );
}
