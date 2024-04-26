
import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import CommentForm from "./CommentForm"
import getCommentsByPostId from "@/app/action/getCommentsByPostId"
import DeleteCommentButton from "./DeleteCommentButton"

interface CommentAreaProps {
  postId: string
}

const CommentArea = async ({ postId }: CommentAreaProps) => {
  const currentUser = await getCurrentUser()

  const comments = await getCommentsByPostId(postId)

  return (
    <>
      <p className="font-bold">この投稿に対するコメント</p>
      {
        currentUser && (
          <div className="mt-4">
            <CommentForm user={currentUser} postId={postId} />
          </div>
        )
      }
      <div className="mt-4 space-y-4">
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
      </div>
    </>
  )
}

export default CommentArea