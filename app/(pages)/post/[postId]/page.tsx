import getCurrentUser from "@/app/action/getCurrentUser";
import getPostById from "@/app/action/getPostById";
import Avatar from "@/components/Avatar";
import CommentArea from "@/components/feature/comment/CommentArea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IParams {
  postId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const { postId } = params;

  const post = await getPostById(postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4">
      <div>
        <div className="sticky top-28 space-y-4">
          <Image
            src={`https://i.ytimg.com/vi/${post.videoId}/hq720.jpg`}
            alt=""
            width={1600}
            height={900}
            className=""
          />
          <Button className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)]">
            <Link href={`https://www.youtube.com/watch?v=${post.videoId}`} target="_blank">Youtubeで視聴する</Link>
          </Button>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader className="space-y-4 pb-0">
            <CardTitle className="leading-tight">
              <div>{post.comment}</div>
            </CardTitle>
            <div className="flex items-center gap-2 my-8">
              <Avatar user={post.postedUser} size={32} />
              <span className="text-sm">{post.postedUser.name}</span>
            </div>
          </CardHeader>
          <CardContent>
            {
              post.detailComment && (
                <p>{post.detailComment}</p>
              )
            }
            <Separator className="my-4" />
            <CommentArea />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
