"use client";

import useVideoImage from "@/app/hooks/useVideoImage";
import Image from "next/image";

interface VideoImageProps {
  id: string;
}

const VideoImage = ({ id }: VideoImageProps) => {
  const imageSrc = useVideoImage(id);

  return (
    <div>
      {imageSrc ? (
        <Image 
          src={imageSrc}
          alt=""
          width={1600}
          height={900}
          className="w-[50%]"
        />
      ):(
        <p className="text-sm font-medium text-destructive">サムネイルを取得できませんでした。IDが正しいか確認してください。</p>
      )}
    </div>
  )
};

export default VideoImage;
