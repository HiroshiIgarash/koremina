"use client";

import { User } from "@prisma/client";
import { useState, Dispatch, SetStateAction } from "react";
import AvatarDropZone from "./AvatarDropZone";
import AvatarCrop from "./AvatarCrop";
import { CircleX } from "lucide-react";

interface ChangeNicknameFormProps {
  user: User | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeNicknameForm = ({ user, setOpen }: ChangeNicknameFormProps) => {
  const [file, setFile] = useState<File & { preview: string }>();

  return (
    <>
      {file ? (
        <AvatarCrop file={file} setFile={setFile} />
      ) : (
        <AvatarDropZone file={file} setFile={setFile} />
      )}
    </>
  );
};

export default ChangeNicknameForm;
