import PostItem from "@/components/feature/post/PostItem";
import getPosts from "./action/getPosts";

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
      {posts.map(post => (
        <PostItem
          key={post.id}
          id={post.id}
          comment={post.comment}
          videoId={post.videoId}
          postedUserName={post.postedUser.nickname || post.postedUser.name}
          postedUser={post.postedUser}
        />
      ))}
    </div>
  );
}
