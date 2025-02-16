import getChannelIcon from "@/app/action/getChannelIcon";
import ChannelIconImage from "./ChannelIconImage";

interface ChannelIconProps {
  channelId: string;
  size?: number;
  quality?: "default" | "medium" | "high";
}

const ChannelIcon = async ({
  channelId,
  size = 48,
  quality = "default",
}: ChannelIconProps) => {
  const iconSrc = await getChannelIcon({ channelId, quality });

  return (
    <>
      {iconSrc.error ? (
        <div
          className="bg-secondary rounded-full border-2 max-w-full aspect-square grid place-content-center"
          style={{
            width: size,
          }}
        >
          <span className="text-xs">No Image</span>
        </div>
      ) : (
        <ChannelIconImage
          src={iconSrc}
          size={size}
          channelId={channelId}
          quality={quality}
        />
      )}
    </>
  );
};

export default ChannelIcon;
