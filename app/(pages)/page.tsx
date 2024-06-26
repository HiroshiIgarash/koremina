import PostFilter from "@/components/feature/post/PostFilter";
import PostFilterContainer from "@/components/feature/post/PostFilterContainer";
import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
    <div className="w-full px-4 mb-8 space-y-2 md:space-y-0 max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-4">
      <div className="flex items-center w-full p-4 md:py-8 border-2 border-[#2A4B71] rounded-lg text-center gap-2">
        <p className="text-lg">スマホの方は「ホーム画面に追加」でURLバーをなくせます</p>
        <Upload className="shrink-0" size="1.4em" />
      </div>
      <Link href="/about" className="relative flex items-center w-full p-4 md:py-8 border-2 border-[#2A4B71] rounded-lg text-center hover:bg-accent">
        <div className="flex-1">
          <p className="text-lg">初めての方へ</p>
          <p className="font-bold text-xl">コレミナについて</p>
        </div>
        <ChevronRight className="absolute top-0 right-4 md:right-2 flex items-center h-full" size="2em" />
      </Link>
    </div>
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
      <Suspense fallback={<SkeletonPostList />}>
        <PostList currentPage={1} postsPerPage={16} filterLiver={undefined} />
      </Suspense>
    </>
  );
}
