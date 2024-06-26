"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface AvatarDropZoneProps {
  file: ReturnType<typeof useState<File & { preview: string }>>[0];
  setFile: ReturnType<typeof useState<File & { preview: string }>>[1];
  disabled?: boolean;
}

const AvatarDropZone = ({ file, setFile, disabled }: AvatarDropZoneProps) => {
  const [isError, setIsError] = useState(false)
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) {
      setIsError(true)
      return;
    };
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop,
      maxFiles: 1,
      disabled,
    });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-1 flex-col items-center p-5 border-2 rounded-s border-gray-200 border-dashed bg-slate-50 text-slate-400 outline-none",
          isFocused && "border-sky-400",
          isDragAccept && "border-green-400",
          isDragReject && "border-red-600"
        )}
      >
        <input {...getInputProps()} />
        <p>クリックで画像選択 もしくはドラッグ&amp;ドロップ</p>
      </div>
      {isError && <p className="text-sm text-destructive">もう一度画像を選択してください。複数選択されていたか、画像ファイルでなかった可能性があります。</p>}
    </>
  );
};

export default AvatarDropZone;
