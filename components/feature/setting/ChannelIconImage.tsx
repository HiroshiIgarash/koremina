"use client";
import getChannelIcon from "@/app/action/getChannelIcon";
import Image from "next/image";
import { useState, useTransition } from "react";

interface ChannelIconImageProps {
  src: string;
  channelId: string;
  size?: number;
  quality?: "default" | "medium" | "high";
}

const ChannelIconImage = ({
  src,
  size,
  channelId,
  quality,
}: ChannelIconImageProps) => {
  const [iconSrc, setIconSrc] = useState(src);
  const [, startTransition] = useTransition();
  return (
    <Image
      src={iconSrc}
      alt=""
      width={size}
      height={size}
      className="rounded-full border-2"
      onError={() => {
        startTransition(async () => {
          const iconSrc = await getChannelIcon({
            channelId,
            quality,
            ignoreCache: true,
          });
          setIconSrc(iconSrc);
        });
      }}
    />
  );
};

export default ChannelIconImage;
