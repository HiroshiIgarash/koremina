"use server";
import { google } from "googleapis";
interface getChannelIconProps {
  channelId: string;
  quality?: "default" | "medium" | "high";
}

const getChannelIcon = async ({
  channelId,
  quality = "default",
}: getChannelIconProps) => {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YT_API_KEY!,
    });

    const params = channelId.startsWith("@")
      ? { part: ["snippet"], forHandle: channelId }
      : { part: ["snippet"], id: [channelId] };

    let response = await youtube.channels.list(params);
    
    if (response.data.items && response.data.items.length > 0) {
      const imageURL = response.data.items[0].snippet?.thumbnails?.[quality]?.url;
      
      if (imageURL) {
        // サムネイルURLが有効かどうかチェック
        if (await isURLAccessible(imageURL)) {
          return imageURL;
        }

        // 再フェッチ（googleapis では新しいリクエストを作成）
        response = await youtube.channels.list(params);
        
        if (response.data.items && response.data.items.length > 0) {
          const newImageURL = response.data.items[0].snippet?.thumbnails?.[quality]?.url;
          // 最悪404になるようにここでは有効性を確認しない
          return newImageURL || imageURL;
        }
      }
      
      return imageURL;
    } else {
      throw new Error("Channel not found");
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
