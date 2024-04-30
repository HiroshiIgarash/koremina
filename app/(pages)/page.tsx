import PostList from "@/components/feature/post/PostList";
import SkeletonPostList from "@/components/feature/post/SkeletonPostList";
import { Suspense } from "react";

export default function Home() {

  return (
    <Suspense fallback={<SkeletonPostList />}>
      <PostList />
    </Suspense>
  );
}
