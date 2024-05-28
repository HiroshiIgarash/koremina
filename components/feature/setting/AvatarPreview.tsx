import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Crop } from "react-image-crop";
import { useDebounce } from "use-debounce";

interface AvatarPreviewProps {
  imageRef: HTMLImageElement | null;
  crop: Crop | undefined;
}

const AvatarPreview = async ({ imageRef, crop }: AvatarPreviewProps) => {
  if (imageRef && crop) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      ctx.drawImage(
        imageRef,
        (crop.x ? crop.x : 1) * scaleX,
        (crop.y ? crop.y : 1) * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        48,
        48
      );
    }
    return await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  }
};

export default AvatarPreview;
