"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDropzone } from "react-dropzone";
import AvatarPreview from "@/components/feature/setting/AvatarPreview";
import { Button } from "@/components/ui/button";

const Page = () => {
  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    setFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  };

  const imageRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [file, setFile] = useState<File & { preview: string }>();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    maxFiles: 1,
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleClick = () => {
    if(!file) return
    AvatarPreview({
      imageRef: imageRef.current,
      crop,
    }).then(async(blob) => {
      if(blob) {
      
        const res = await fetch(
          `/api/upload?filename=${file.name}`,
          {
            method: 'POST',
            body: blob,
          },
        )
        console.log(res)
      }
    });
  };

  return (
    <>
      <div
        {...getRootProps()}
        style={{ border: "1px solid #ff7f50", width: 200, height: 150 }}
      >
        <input {...getInputProps()} />
        <p>ここにファイルをドラッグ&ドロップしてください。</p>
      </div>

      <ReactCrop aspect={1} crop={crop} onChange={(c) => setCrop(c)} circularCrop>
        {file && (
          <Image
            ref={imageRef}
            src={file.preview}
            alt=""
            width={300}
            height={300}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        )}
      </ReactCrop>

      <Button onClick={handleClick}>URLを表示する</Button>
    </>
  );
};

export default Page;
