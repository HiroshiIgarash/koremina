import PostFilter from "@/components/feature/post/PostFilter";
import PostFilterContainer from "@/components/feature/post/PostFilterContainer";
import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

const Page = async (props: PageProps<"/page">) => {
  const searchParams = await props.searchParams;
  const filterLiver = Array.isArray(searchParams?.liver)
    ? searchParams.liver[0]
    : searchParams?.liver;

  const currentPage = parseInt(
    Array.isArray(searchParams?.page)
      ? searchParams.page[0] || "1"
      : searchParams?.page || "1"
  );
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
