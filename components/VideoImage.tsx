"use client";

import useVideoImage from "@/app/hooks/useVideoImage";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface VideoImageProps {
  id: string;
  setIsValidVideoId: Dispatch<SetStateAction<boolean>>
}

const VideoImage = ({ id, setIsValidVideoId }: VideoImageProps) => {
  const { imageSrc } = useVideoImage(id);

  setIsValidVideoId(!!imageSrc)



  return (
    <div>
      {imageSrc === undefined ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={1600}
          height={900}
          className="w-[50%]"
        />
      ) : imageSrc === null && (
        <p className="text-sm font-medium text-destructive">
          サムネイルを取得できませんでした。IDが正しいか確認してください。
        </p>
      )}
    </div>
  );
};

export default VideoImage;
