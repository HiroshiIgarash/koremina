"use server";

interface GetChannelIconProps {
  channelId: string;
  quality?: "default" | "medium" | "high";
}

type GetChannelIconResult = string | { error: string };

const getChannelIcon = async ({
  channelId,
  quality = "default",
}: GetChannelIconProps): Promise<GetChannelIconResult> => {
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
      {
        next: {
          revalidate: 60 * 60 * 24 * 30 /** 1ヶ月ごとにrevalidate */,
          tags: [`channel-icon-${channelId}`],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`YouTube API エラー: status ${res.status}`);
    }

    const data = await res.json();

    // チャンネルが存在しない場合は items が空配列になる
    const url = data.items?.[0]?.snippet?.thumbnails?.[quality]?.url;
    if (!url) {
      throw new Error(`アイコンURLが取得できません: ${channelId}`);
    }

    return url as string;
  } catch (error) {
    console.error("[getChannelIcon] エラー:", error);
    return { error: "Failed to get channel icon" };
  }
};

export default getChannelIcon;
