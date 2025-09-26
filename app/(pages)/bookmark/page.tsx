import BookmarkContainer from "@/components/feature/bookmark/BookmarkContainer";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

interface ISearchParams {
  page: string;
}

const Page = async (props: { searchParams?: Promise<ISearchParams> }) => {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams?.page || "1");
  const postsPerPage = 16;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 px-4 w-full max-w-7xl mx-auto">
          ブックマーク
        </h1>
      </div>
      <Suspense fallback={<SkeletonPostList />}>
        <BookmarkContainer
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      </Suspense>
    </>
  );
};

export default Page;
