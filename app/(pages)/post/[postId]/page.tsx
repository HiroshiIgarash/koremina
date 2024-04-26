import getCurrentUser from "@/app/action/getCurrentUser";
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

interface IParams {
  postId: string;
}

const Page = ({ params }: { params: IParams }) => {
  const { postId } = params;

  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4">
      <div>
        <div
          className="
          aspect-video
          bg-slate-300
          sticky
          top-28
        "
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="leading-tight">
              ここに投稿者コメントここに投稿者コメントここに投稿者コメント
            </CardTitle>
            <div>投稿者のアイコンと名前</div>
          </CardHeader>
          <CardContent>
            <p>
              ここに詳細なコメントここに詳細なコメントここに詳細なコメントここに詳細なコメントここに詳細なコメントここに詳細なコメントここに詳細なコメントここに詳細なコメント
            </p>
            <Separator className="my-4" />
            <CommentArea />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
