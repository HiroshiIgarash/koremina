import axios from "axios";

interface getChannelIconProps {
  channelId: string
  quality?:'default' | 'medium' | 'high'
}

const getChannelIcon = async ({ channelId, quality = 'default' }: getChannelIconProps) => {
  
  const searchParams = new URLSearchParams()

  searchParams.set('part','snippet')
  searchParams.set('key', process.env.YT_API_KEY!)
  if (channelId.startsWith('@')) {
    searchParams.set('forHandle',channelId)
  } else {
    searchParams.set('id',channelId)
  }

  try {
    const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`)
    
    // console.log(res.data)
    
    if (!res.data.items) {
      return null
    }

    return res.data.items[0].snippet.thumbnails[quality].url
  } catch (error) {
    console.log(error)
  }
  
}

export default getChannelIcon