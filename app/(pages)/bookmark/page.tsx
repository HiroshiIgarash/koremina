import BookmarkContainer from "@/components/feature/bookmark/BookmarkContainer";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Page = async (props: PageProps<"/bookmark">) => {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(
    Array.isArray(searchParams?.page)
      ? searchParams.page[0] || "1"
      : searchParams?.page || "1"
  );
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
