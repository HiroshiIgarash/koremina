import { noto } from "@/app/(pages)/layout";
import { auth } from "@/auth";
import Avatar from "@/components/Avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import CommentArea from "../comment/CommentArea";
import BookmarkButton from "./BookMarkButton";
import PostDeleteDialog from "./PostDeleteDialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getCachedPostById } from "@/app/(pages)/post/[postId]/_utils/functions";
import PostBookmarkButton from "./PostBookmarkButton";

interface PostDetailCardProps {
  postId: string;
}

export default async function PostDetailCard({ postId }: PostDetailCardProps) {
  const session = await auth();

  const post = await getCachedPostById(postId);

  if (!post) return;

  const currentUser = session?.user;

  return (
    <Card className="relative">
      {currentUser?.id && (
        <div className="absolute top-4 right-4 flex gap-2">
          {post.postedUserId === currentUser.id && (
            <>
              <Link href={`/post/edit/${postId}`}>
                <FilePenLine />
              </Link>
              <PostDeleteDialog postId={postId}>
                <Trash2 color="red" />
              </PostDeleteDialog>
            </>
          )}
          <PostBookmarkButton postId={postId} />
        </div>
      )}
      <CardHeader className="space-y-4 pb-0">
        <CardTitle
          className={cn(
            "leading-tight",
            post.postedUserId === currentUser?.id ? "pr-20" : "pr-6"
          )}
        >
          <div>{post.comment}</div>
        </CardTitle>
        <Link
          href={`/user/${post.postedUser.id}`}
          className="my-8 w-fit hover:opacity-70 transition-opacity ml-auto"
        >
          <div className="flex justify-end items-center gap-2">
            <Avatar user={post.postedUser} size={32} />
            <p className="text-sm truncate max-w-40">
              {post.postedUser.nickname || post.postedUser.name}
            </p>
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.liver.map((l) => (
            <Badge
              key={l.name}
              variant="outline"
              className="whitespace-nowrap text-sm hover:border-sky-500 transition"
            >
              <Link href={`/page?liver=${l.id}`}>{l.name}</Link>
            </Badge>
          ))}
        </div>
        {post.detailComment && (
          <pre
            className={cn("mt-2 whitespace-pre-wrap break-all", noto.className)}
          >
            {post.detailComment}
          </pre>
        )}
        <Separator className="my-4" />
        <CommentArea postId={postId} />
      </CardContent>
    </Card>
  );
}
