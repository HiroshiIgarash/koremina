import PostEditContainer from "@/components/feature/post/PostEditContainer";

interface IParam {
  postId: string;
}

const Page = ({params}:{params:IParam}) => {
  const {postId} = params
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <PostEditContainer postId={postId} />
    </div>
  );
};

export default Page;
