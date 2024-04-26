
import getCurrentUser from "@/app/action/getCurrentUser"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const CommentArea = async () => {
  const currentUser = await getCurrentUser()

  return (
    <>
      <p className="font-bold">この投稿に対するコメント</p>
      {
        currentUser && (
          <div className="mt-4 flex gap-4 items-center">
            <Avatar user={currentUser} />
            <Input placeholder="コメントする" />
            <Button>送信</Button>
          </div>
        )
      }
      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <p>
              ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <p>
              ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <p>
              ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示ここに他ユーザーからのコメントを表示
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default CommentArea