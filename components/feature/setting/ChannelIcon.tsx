import getChannelIcon from "@/app/action/getChannelIcon"
import Image from "next/image"

interface ChannelIconProps {
  channelId: string
  size?: number
  quality?: 'default' | 'medium' | 'high'
}

const ChannelIcon = async ({ channelId, size = 48, quality = 'default' }: ChannelIconProps) => {

  const iconSrc = await getChannelIcon({ channelId, quality })
  
  return (
    <>
      {
        iconSrc ? (
          <Image
            src={iconSrc}
            alt=''
            width={size}
            height={size}
            className="rounded-full border-2"
          />
        ) : (
          <div
              className="bg-secondary rounded-full border-2"
              style={{
                width: size,
                height: size,
              }}
          />
        )
      }
    </>
  )

}

export default ChannelIcon