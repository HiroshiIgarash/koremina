const getYoutubeTitleById = async (videoId: string) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YT_API_KEY}`,
      { cache: "force-cache" }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data.items[0].snippet.title;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to get title",
    };
  }
};

export default getYoutubeTitleById;
