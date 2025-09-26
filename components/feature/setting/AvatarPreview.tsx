import { Crop } from "react-image-crop";

interface AvatarPreviewProps {
  imageRef: HTMLImageElement | null;
  crop: Crop | undefined;
}

const AvatarPreview = async ({ imageRef, crop }: AvatarPreviewProps) => {
  if (imageRef && crop) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    canvas.width = 96;
    canvas.height = 96;
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
        96,
        96
      );
    }
    return await new Promise<Blob | null>(resolve => {
      canvas.toBlob(
        blob => {
          resolve(blob);
        },
        "image/jpeg",
        0.2
      );
    });
  }
};

export default AvatarPreview;
