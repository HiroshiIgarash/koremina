"use client";

import revalidateChannelIcon from "@/app/action/revalidateChannelIcon";
import Image from "next/image";
import { useState } from "react";

interface ChannelIconImageProps {
  src: string;
  channelId: string;
  size: number;
}

const ChannelIconImage = ({ src, channelId, size }: ChannelIconImageProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = async () => {
    setHasError(true);
    // キャッシュを無効化して次回訪問時に新しいアイコンURLを取得
    await revalidateChannelIcon(channelId);
  };

  if (hasError) {
    return (
      <div
        className="bg-secondary rounded-full border-2 max-w-full aspect-square grid place-content-center"
        style={{ width: size }}
      >
        <span className="text-xs">No Image</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="rounded-full border-2 max-w-full"
      onError={handleError}
      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
    />
  );
};

export default ChannelIconImage;
