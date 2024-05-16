"use client";

import { clsx } from "clsx";
import { useEffect, type useState } from "react";
import { useDropzone } from "react-dropzone";

interface AvatarDropZoneProps {
  file: ReturnType<typeof useState<File & { preview: string }>>[0];
  setFile: ReturnType<typeof useState<File & { preview: string }>>[1];
}

const AvatarDropZone = ({ file, setFile }: AvatarDropZoneProps) => {
  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
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
    });

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx(
          "flex flex-1 flex-col items-center p-5 border-2 rounded-s border-gray-200 border-dashed bg-slate-50 text-slate-400 outline-none",
          isFocused && "border-sky-400",
          isDragAccept && "border-green-400",
          isDragReject && "border-red-600"
        )}
      >
        <input {...getInputProps()} />
        <p>クリックで画像選択 もしくはドラッグ&amp;ドロップ</p>
      </div>
    </>
  );
};

export default AvatarDropZone;
