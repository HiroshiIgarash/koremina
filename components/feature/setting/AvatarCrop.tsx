"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Crop, ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AvatarPreview from "./AvatarPreview";

interface AvatarCrop {
  file: File & { preview: string };
  setFile: ReturnType<typeof useState<File & { preview: string }>>[1];
}

const AvatarCrop = ({ file, setFile }: AvatarCrop) => {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);

  const handleResetFile = () => {
    setFile(undefined);
  };

  const handleUpload = () => {
    if (!file) return;
    AvatarPreview({
      imageRef: imageRef.current,
      crop,
    }).then(async (blob) => {
      if (blob) {
        const url = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: blob,
        });
      }
    });
  };

  return (
    <>
      <div className="flex items-start gap-2">
        <ReactCrop
          aspect={1}
          crop={crop}
          onChange={(c) => setCrop(c)}
          circularCrop
        >
          <Image
            ref={imageRef}
            src={file.preview}
            alt=""
            width={150}
            height={150}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        </ReactCrop>
        <CircleX
          onClick={handleResetFile}
          size={16}
          color="#ff0000"
          strokeWidth={1.5}
          absoluteStrokeWidth
        />
      </div>
      <Button onClick={handleUpload}>アップロードする</Button>
    </>
  );
};

export default AvatarCrop;
