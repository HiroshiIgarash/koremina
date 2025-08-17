import getLivers from "@/app/action/getLivers";
import PostFilter from "./PostFilter";
import getCurrentUser from "@/app/action/getCurrentUser";

interface PostFilterContainerProps {
  filterLiver?: string;
}

const PostFilterContainer = async ({
  filterLiver,
}: PostFilterContainerProps) => {
  const [livers, user] = await Promise.all([getLivers(), getCurrentUser()]);

  return (
    <PostFilter filterLiversId={filterLiver} livers={livers} user={user} />
  );
};

export default PostFilterContainer;
