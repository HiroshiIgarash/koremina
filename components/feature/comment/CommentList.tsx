import getCommentsByPostId from "@/app/action/getCommentsByPostId"
import Avatar from "@/components/Avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import DeleteCommentButton from "./DeleteCommentButton"
import { User } from "@prisma/client"

interface CommentListProps {
  postId: string
  currentUser: User | null
}

const CommentList = async ({ postId, currentUser }: CommentListProps) => {
  const comments = await getCommentsByPostId(postId)

  return (
    <>
      {
        (comments && comments.length > 0) ?
          comments.map(comment => (
            <Card key={comment.id}>
              <CardHeader className="pb-2 flex-row justify-between">
                <div className="flex items-center gap-2">
                  <Avatar user={comment.author} size={32} />
                  <span className="text-sm">{comment.author.nickname || comment.author.name}</span>
                </div>
                {
                  comment.authorId === currentUser?.id && (
                    <DeleteCommentButton commentId={comment.id} postId={postId} />
                  )
                }
              </CardHeader>
              <CardContent>
                <p>
                  {comment.content}
                </p>
              </CardContent>
            </Card>
          )) : (
            <p>コメントはまだありません。</p>
          )
      }
    </>
  )
}

export default CommentList