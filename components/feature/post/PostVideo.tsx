import { getCachedPostById } from "@/app/(pages)/post/[postId]/_utils/functions";
import { YouTubeEmbed } from "@next/third-parties/google";

interface PostVideoProps {
  postId: string;
}

export default async function PostVideo({ postId }: PostVideoProps) {
  const post = await getCachedPostById(postId);

  if (!post) return;

  return <YouTubeEmbed videoid={post.videoId} />;
}
