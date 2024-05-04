import getPostById from "@/app/action/getPostById"
import Avatar from "@/components/Avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Reaction } from "@/types/type"
import { Liver, User } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PostItemProps {
  id: string
  comment: string
  videoId: string
  postedUserName: string | null
  postedUser: User,
  livers: Liver[]
  reactions: {[k in Reaction]:User[]}
}

const PostItem = async ({ id, comment, videoId, postedUserName, postedUser, livers, reactions }: PostItemProps) => {

  //動画タイトルの取得
  const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`,{cache: 'force-cache'})
    .then(r => {
      if (r.status === 200) {
        return r.json()
      } else {
        throw new Error()
      }
    })
    .catch(() => {
      return []
    })

  const title = res.items?.[0].snippet.title
  
  return (
    <Link href={`/post/${id}`}>
      <Card className="flex flex-col h-full hover:border-sky-300 hover:bg-sky-50 transition">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:h-[4em] leading-tight">
            {comment}
          </CardTitle>
          <div className="flex justify-end items-center gap-2">
            <Avatar user={postedUser} size={32} />
            <span className="text-sm">{postedUserName}</span>
          </div>
        </CardHeader>
        <CardContent className="grow space-y-2 pb-2">
          <div className="flex flex-wrap gap-2">
            {
              livers.map(liver=>(
                <Badge key={liver.id} variant="outline">{liver.name}</Badge>
              ))
            }
          </div>
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={1600}
            height={900}
            className="aspect-video object-cover"
          />
          <p className="text-xs">{title}</p>
        </CardContent>
        <CardFooter className="flex items-end flex-col space-y-2 text-sm">
          <div className="flex gap-2 justify-self-end">
            <span className=" rounded-full px-2">👍 { reactions.good.length}</span>
            <span className=" rounded-full px-2">👎 {reactions.bad.length}</span>
          </div>
          <div className="flex gap-2">
            <span className=" rounded-full px-2">😍 {reactions.love.length}</span>
            <span className=" rounded-full px-2">🤣 {reactions.funny.length}</span>
            <span className=" rounded-full px-2">😭 {reactions.cry.length}</span>
            <span className=" rounded-full px-2">😇 {reactions.angel.length}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PostItem