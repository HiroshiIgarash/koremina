import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from "axios"
import Image from "next/image"

interface PostItemProps {
  id: string
}

const PostItem = async({ id }: PostItemProps) => {
  const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.YT_API_KEY}`)
  const title = res.data.items[0].snippet.title
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="md:h-[3em]">
        〇〇すきに絶対見て欲しい！
        </CardTitle>
        <div className="ml-a">
          ヒロシです
        </div>
      </CardHeader>
      <CardContent className="grow space-y-2">
        <Image
          src={`https://i.ytimg.com/vi/${id}/hq720.jpg`}
          alt=""
          width={1600}
          height={900}
        />
        <p>{title}</p>
      </CardContent>
      <CardFooter className="flex items-end flex-col space-y-2 text-sm">
        <div className="flex gap-2 justify-self-end">
          <span className="border rounded-full py-1 px-2">👍 3</span>
          <span className="border rounded-full py-1 px-2">👎 3</span>
        </div>
        <div className="flex gap-2">
          <span className="border rounded-full py-1 px-2">😍 3</span>
          <span className="border rounded-full py-1 px-2">🤣 3</span>
          <span className="border rounded-full py-1 px-2">😭 3</span>
          <span className="border rounded-full py-1 px-2">😇 3</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostItem