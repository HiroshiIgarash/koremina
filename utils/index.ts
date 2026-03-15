import { cacheTag, cacheLife } from "next/cache";

const getYoutubeTitleById = async (videoId: string) => {
  "use cache";
  cacheTag(`youtube-title:${videoId}`);
  cacheLife("max");

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`
    );
    if (res.status === 200) {
      const data = await res.json();
      const title = data.items?.[0]?.snippet?.title;
      if (title) return title;
      throw new Error();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error("[getYoutubeTitleById] YouTube API エラー:", error);
    return {
      error: "Failed to get title",
    };
  }
};

export default getYoutubeTitleById;
