"use client";

import useVideoImage from "@/app/hooks/useVideoImage";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface VideoImageProps {
  id: string;
}

const VideoImage = ({ id }: VideoImageProps) => {
  const { imageSrc, isFetching } = useVideoImage(id);

  return (
    <div>
      {isFetching ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={1600}
          height={900}
          className="w-[50%]"
        />
      ) : (
        <p className="text-sm font-medium text-destructive">
          サムネイルを取得できませんでした。IDが正しいか確認してください。
        </p>
      )}
    </div>
  );
};

export default VideoImage;
