import Avatar from "@/components/Avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { User } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

interface PostItemProps {
  id: string
  comment: string
  videoId: string
  postedUserName: string | null
  postedUser: User
}

const PostItem = async ({ id, comment,videoId,postedUserName,postedUser }: PostItemProps) => {
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`)
  const title = res.data.items[0].snippet.title
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
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg`}
            alt=""
            width={1600}
            height={900}
          />
          <p className="text-xs">{title}</p>
        </CardContent>
        <CardFooter className="flex items-end flex-col space-y-2 text-sm">
          <div className="flex gap-2 justify-self-end">
            <span className=" rounded-full px-2">👍 3</span>
            <span className=" rounded-full px-2">👎 3</span>
          </div>
          <div className="flex gap-2">
            <span className=" rounded-full px-2">😍 3</span>
            <span className=" rounded-full px-2">🤣 3</span>
            <span className=" rounded-full px-2">😭 3</span>
            <span className=" rounded-full px-2">😇 3</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default PostItem