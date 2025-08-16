import { User, Video } from "@prisma/client";
import ReactionButton from "./ReactionButton";
import { Reaction } from "@/types/type";
import getCurrentUser from "@/app/action/getCurrentUser";
import getReactionsByPostId from "@/app/action/getReactionsByPostId";

interface ReactionButtonListProps {
  postId: string;
}

const ReactionButtonList = async ({ postId }: ReactionButtonListProps) => {
  const currentUser = await getCurrentUser();
  const post = await getReactionsByPostId(postId);

  if (!post) return;

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-4 items-start">
        <ReactionButton
          reaction="good"
          user={currentUser}
          post={post}
          display="👍"
        />
      </div>
      <div className="flex gap-4 items-start">
        <ReactionButton
          reaction="love"
          user={currentUser}
          post={post}
          display="😍"
        />
        <ReactionButton
          reaction="funny"
          user={currentUser}
          post={post}
          display="🤣"
        />
        <ReactionButton
          reaction="cry"
          user={currentUser}
          post={post}
          display="😭"
        />
        <ReactionButton
          reaction="angel"
          user={currentUser}
          post={post}
          display="😇"
        />
      </div>
    </div>
  );
};

export default ReactionButtonList;
