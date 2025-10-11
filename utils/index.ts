import { google } from "googleapis";

const getYoutubeTitleById = async (videoId: string) => {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.YT_API_KEY,
    });

    const response = await youtube.videos.list({
      part: ["snippet"],
      id: [videoId],
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].snippet?.title;
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to get title",
    };
  }
};

export default getYoutubeTitleById;
