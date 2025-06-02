import { getCachedPostById } from "@/app/(pages)/post/[postId]/_utils/functions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IParams {
  postId: string;
}

export default async function YoutubeLinkButton({ postId }: IParams) {
  const post = await getCachedPostById(postId);

  if (!post) return;

  return (
    <Button
      className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)] text-white"
      asChild
    >
      <Link
        href={`https://www.youtube.com/watch?v=${post.videoId}`}
        target="_blank"
      >
        Youtubeで視聴する
      </Link>
    </Button>
  );
}
