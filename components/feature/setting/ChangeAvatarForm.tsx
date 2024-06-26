"use client";

import { User } from "@prisma/client";
import { useState, Dispatch, SetStateAction, useTransition } from "react";
import AvatarDropZone from "./AvatarDropZone";
import AvatarCrop from "./AvatarCrop";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import updateAvatar from "@/app/action/updateAvatar";
import { useToast } from "@/components/ui/use-toast";

interface ChangeAvatarFormProps {
  user: User | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ChangeAvatarForm = ({ user, setOpen }: ChangeAvatarFormProps) => {
  const [file, setFile] = useState<File & { preview: string }>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDefaultAvatarClick = () => {
    startTransition(async () => {
      await updateAvatar();
      toast({
        description: "アバターを変更しました",
      });
      setOpen(false);
    });
  };

  return (
    <>
      {file ? (
        <AvatarCrop file={file} setFile={setFile} setOpen={setOpen} />
      ) : (
        <AvatarDropZone file={file} setFile={setFile} disabled={isPending} />
      )}
      {!file && (
        <>
          <Separator />
          <div className="flex gap-4 items-center">
            <Image
              src={user?.image || "/user.png"}
              width={48}
              height={48}
              alt=""
              className="rounded-full border-2"
            />
            <Button
              onClick={handleDefaultAvatarClick}
              size="sm"
              variant={"outline"}
              disabled={isPending}
            >
              {isPending ? "変更中..." : "デフォルトの画像を使用"}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeAvatarForm;
