"use server";

import { revalidateTag } from "next/cache";

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
    let res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`,
      {
        cache: "force-cache",
        next: {
          revalidate: 60 * 60 * 24 /** 24時間ごとにrevalidate */,
          tags: [`channel-icon-${channelId}`],
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      const imageURL = data.items[0].snippet.thumbnails[quality].url;

      // サムネイルURLが有効かどうかチェック
      if (await isURLAccessible(imageURL)) {
        return imageURL;
      } else {
        // キャッシュされたURLが無効の場合、キャッシュを破棄して再フェッチ
        revalidateTag(`channel-icon-${channelId}`);
      }

      // 再フェッチ
      res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`,
        {
          cache: "force-cache",
          next: {
            revalidate: 60 * 60 * 24 /** 24時間ごとにrevalidate */,
            tags: [`channel-icon-${channelId}`],
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        const imageURL = data.items[0].snippet.thumbnails[quality].url;

        // 最悪404になるようにここでは有効性を確認しない
        return imageURL;
      }

      return imageURL;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { error: "Failed to get channel icon" };
  }
};

// URLの有効性を確認するヘルパー関数
const isURLAccessible = async (url: string) => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok; // ステータスが200系ならtrue
  } catch {
    return false;
  }
};

export default getChannelIcon;
