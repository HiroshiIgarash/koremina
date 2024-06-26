import BookmarkContainer from "@/components/feature/bookmark/BookmarkContainer";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface ISearchParams {
  page: string;
}

const Page = ({ searchParams }: { searchParams?: ISearchParams }) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const postsPerPage = 16;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">ブックマーク</h1>
      <Suspense fallback={<SkeletonPostList />}>
        <BookmarkContainer
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      </Suspense>
    </div>
  );
};

export default Page;
