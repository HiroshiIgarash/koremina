import PostFilter from "@/components/feature/post/PostFilter";
import PostFilterContainer from "@/components/feature/post/PostFilterContainer";
import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

interface ISearchParams {
  liver: string;
  page: string;
}

const Page = ({ searchParams }: { searchParams?: ISearchParams }) => {
  const filterLiver = searchParams?.liver;

  const currentPage = parseInt(searchParams?.page || "1");
  const postsPerPage = 16;

  return (
    <>
      <Suspense
        fallback={
          <PostFilter
            filterLiversId={filterLiver}
            livers={[]}
            user={null}
            isPending
          />
        }
      >
        <PostFilterContainer filterLiver={filterLiver} />
      </Suspense>
      <Suspense fallback={<SkeletonPostList />}>
        <PostList
          filterLiver={filterLiver}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
        />
      </Suspense>
    </>
  );
};

export default Page;
