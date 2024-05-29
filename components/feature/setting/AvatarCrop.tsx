"use client";

import { Button } from "@/components/ui/button";
import { CircleX } from "lucide-react";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from "react";
import { Crop, ReactCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import AvatarPreview from "./AvatarPreview";
import updateAvatar from "@/app/action/updateAvatar";
import { useToast } from "@/components/ui/use-toast";

interface AvatarCrop {
  file: File & { preview: string };
  setFile: ReturnType<typeof useState<File & { preview: string }>>[1];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const AvatarCrop = ({ file, setFile, setOpen }: AvatarCrop) => {
  const [crop, setCrop] = useState<Crop>();
  const imageRef = useRef<HTMLImageElement>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleResetFile = () => {
    setFile(undefined);
  };

  const handleUpload = () => {
    if (!file) return;
    startTransition(async () => {
      await AvatarPreview({
        imageRef: imageRef.current,
        crop,
      }).then(async (blob) => {
        if (!blob) throw new Error("invalid data");

        // vercel Blob にアップ
        const res = await fetch(`/api/vercelblob?filename=${file.name}.jpg`, {
          method: "POST",
          body: blob,
        });

        const data = await res.json();
        const url = data.url;

        // DB更新、前のBlobを削除
        await updateAvatar(url);
      });
      toast({
        description: "アバターを変更しました",
      });
      setOpen(false);
    });
  };

  const isUncropped = !crop?.width || !crop.height;

  return (
    <>
      <div className="flex items-start gap-2">
        <ReactCrop
          aspect={1}
          crop={crop}
          onChange={(c) => setCrop(c)}
          circularCrop
          minWidth={48}
          className="md:!max-w-[min(200px,100%)]"
        >
          <Image
            className="pointer-events-none w-full"
            ref={imageRef}
            src={file.preview}
            alt=""
            width={200}
            height={200}
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
          className="shrink-0"
        />
      </div>
      <Button onClick={handleUpload} disabled={isUncropped || isPending}>
        {isUncropped
          ? "範囲を選択してください"
          : isPending
          ? "アップロード中..."
          : "アップロード"}
      </Button>
    </>
  );
};

export default AvatarCrop;
