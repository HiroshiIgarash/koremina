import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import getYoutubeTitleById from "@/utils";
import { getCachedPostById } from "@/app/(pages)/post/[postId]/_utils/functions";

interface IParams {
  postId: string;
}

export default async function XShareButton({ postId }: IParams) {
  const post = await getCachedPostById(postId);

  if (!post) return;

  const videoId = post.videoId;

  const title = await getYoutubeTitleById(videoId);

  return (
    <Button
      className="bg-black hover:bg-black/75 dark:border text-white"
      asChild
    >
      <Link
        href={`https://x.com/intent/post?text=${encodeURIComponent(
          `

#コレミナ から動画をシェアしました！

${title}
https://youtu.be/${videoId}`
        )}`}
        target="_blank"
        className="flex items-center gap-4"
      >
        <Image src="/x-logo-white.png" width="20" height="20" alt="" />
        Xでシェアする
      </Link>
    </Button>
  );
}
