"use client"

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
  user: User | null;
  size?: number;
}

const Avatar = ({ user, size = 48 }: AvatarProps) => {
  if (!user) {
    return null;
  }

  return (
    <Image
      src={user.uploadedImage || user.image || "/user.png" }
      width={size}
      height={size}
      alt=""
      onError={
        e => {
          e.currentTarget.src = "/user.png"
        }
      }
      className="rounded-full border-2"
      unoptimized
    />
  );
};

export default Avatar;
