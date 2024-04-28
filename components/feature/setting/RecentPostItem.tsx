import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

interface RecentPostItemProps {
  postId: string
  videoId: string
  comment: string
}


const RecentPostItem = async ({ postId, videoId, comment }: RecentPostItemProps) => {
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`)
  if (res.data.items.length === 0) return null

  const title = res.data.items[0].snippet.title
  return (

    <Link href={`/post/${postId}`}>
      <Card className="flex h-full flex-col lg:flex-row gap-4 hover:border-sky-300 hover:bg-sky-50 transition p-8">
        <div className="lg:w-[49%] w-full shrink-0">
          <Image
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            width={1600}
            height={900}
            className="aspect-video object-cover"
          />
          <p className="text-xs mt-2">{title}</p>
        </div>
        <div className="flex flex-col justify-between grow">
          <CardTitle className="text-lg lg:h-[4em] leading-tight">
            {comment}
          </CardTitle>
          <div className="flex items-end flex-col space-y-2 text-sm">
            <div className="flex gap-2 justify-self-end">
              <span className=" rounded-full py-1 px-2">👍 3</span>
              <span className=" rounded-full py-1 px-2">👎 3</span>
            </div>
            <div className="flex gap-2">
              <span className=" rounded-full py-1 px-2">😍 3</span>
              <span className=" rounded-full py-1 px-2">🤣 3</span>
              <span className=" rounded-full py-1 px-2">😭 3</span>
              <span className=" rounded-full py-1 px-2">😇 3</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default RecentPostItem