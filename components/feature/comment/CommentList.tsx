import getCommentsByPostId from "@/app/action/getCommentsByPostId";
import Avatar from "@/components/Avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DeleteCommentButton from "./DeleteCommentButton";
import { User } from "@prisma/client";
import Link from "next/link";
import TextWithTimestamps from "@/components/ui/TextWithTimestamps";

interface CommentListProps {
  postId: string;
  currentUser: User | null;
  videoId: string;
}

const CommentList = async ({ postId, currentUser, videoId }: CommentListProps) => {
  const comments = await getCommentsByPostId(postId);

  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map(comment => (
          <Card key={comment.id}>
            <CardHeader className="pb-2 flex-row gap-2 justify-between">
              <Link
                href={`/user/${comment.author.id}`}
                className="w-fit hover:opacity-70 transition-opacity"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Avatar user={comment.author} size={32} />
                  <span className="text-sm truncate md:max-w-none">
                    {comment.author.nickname || comment.author.name}
                  </span>
                </div>
              </Link>
              {comment.authorId === currentUser?.id && (
                <DeleteCommentButton commentId={comment.id} postId={postId} />
              )}
            </CardHeader>
            <CardContent>
              <p>
                <TextWithTimestamps 
                  text={comment.content} 
                  videoId={videoId}
                />
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>コメントはまだありません。</p>
      )}
    </>
  );
};

export default CommentList;
