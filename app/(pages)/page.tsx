import PostFilter from "@/components/feature/post/PostFilter";
import PostFilterContainer from "@/components/feature/post/PostFilterContainer";
import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
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
