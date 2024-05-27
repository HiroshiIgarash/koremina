interface getChannelIconProps {
  channelId: string;
  quality?: "default" | "medium" | "high";
}

const getChannelIcon = async ({
  channelId,
  quality = "default",
}: getChannelIconProps) => {
  const searchParams = new URLSearchParams();

  searchParams.set("part", "snippet");
  searchParams.set("key", process.env.YT_API_KEY!);
  if (channelId.startsWith("@")) {
    searchParams.set("forHandle", channelId);
  } else {
    searchParams.set("id", channelId);
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`,
      { cache: "force-cache" }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data.items[0].snippet.thumbnails[quality].url;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { error: "Failed to get channel icon" };
  }
};

export default getChannelIcon;
