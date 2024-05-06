import PostFilter from "@/components/feature/post/PostFilter";
import PostList from "@/components/feature/post/PostList";

export default function Home() {

  return (
    <>
      <PostFilter filterLiversId={undefined} />
      <PostList
        currentPage={1}
        postsPerPage={16}
        filterLiver={undefined} />
    </>
  )
}
