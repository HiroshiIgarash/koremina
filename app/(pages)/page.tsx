import PostFilter from "@/components/feature/post/PostFilter";
import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

export default function Home() {

  return (
    <>
      <PostFilter filterLiversId={undefined} />
      <Suspense fallback={<SkeletonPostList />}>
        <PostList
          currentPage={1}
          postsPerPage={16}
          filterLiver={undefined} />
      </Suspense>
    </>
  )
}
