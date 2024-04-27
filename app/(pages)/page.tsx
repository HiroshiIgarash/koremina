import PostItem from "@/components/feature/post/PostItem";
import getPosts from "../action/getPosts";
import { Suspense } from "react";
import SkeltonPostItem from "@/components/feature/post/SkeltonPostItem";

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
      {posts.map(post => (
        <Suspense key={post.id} fallback={<SkeltonPostItem />}>
          <PostItem
          id={post.id}
          comment={post.comment}
          videoId={post.videoId}
          postedUserName={post.postedUser.nickname || post.postedUser.name}
          postedUser={post.postedUser}
          />
        </Suspense>
        
      ))}
    </div>
  );
}
