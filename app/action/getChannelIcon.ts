interface getChannelIconProps {
  channelId: string
  quality?: 'default' | 'medium' | 'high'
}

const getChannelIcon = async ({ channelId, quality = 'default' }: getChannelIconProps) => {

  const searchParams = new URLSearchParams()

  searchParams.set('part', 'snippet')
  searchParams.set('key', process.env.YT_API_KEY!)
  if (channelId.startsWith('@')) {
    searchParams.set('forHandle', channelId)
  } else {
    searchParams.set('id', channelId)
  }

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?${searchParams.toString()}`)
      .then(r => {
        if (r.status === 200) {
          return r.json()
        }
      })
      .catch(() => {
        return []
      })


    if (!res?.items) {
      return null
    }

    return res.items[0].snippet.thumbnails[quality].url
  } catch (error) {
    console.log(error)
  }

}

export default getChannelIcon