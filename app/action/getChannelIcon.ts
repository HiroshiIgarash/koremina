import { cacheLife, cacheTag } from "next/cache";

interface GetChannelIconProps {
  channelId: string;
  quality?: "default" | "medium" | "high";
}

type GetChannelIconResult = string | { error: string };

const getChannelIcon = async ({
  channelId,
  quality = "default",
}: GetChannelIconProps): Promise<GetChannelIconResult> => {
  "use cache";
  // revalidateChannelIcon の updateTag と対応させる
  cacheTag(`channel-icon-${channelId}`);

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
      `https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`
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

    // 旧 fetch の revalidate（1ヶ月）に相当するプリセット
    cacheLife("max");

    return url as string;
  } catch (error) {
    console.error("[getChannelIcon] エラー:", error);
    // 失敗結果も戻り値としてキャッシュされるため、短命にして自然に再取得させる。
    // エラー時は ChannelIconImage を描画せず onError による自己修復が働かないので、
    // ここを長期キャッシュにすると一時的な API 障害で No Image が固着する
    cacheLife("minutes");
    return { error: "Failed to get channel icon" };
  }
};

export default getChannelIcon;
