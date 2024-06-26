import Avatar from "@/components/Avatar";
import React from "react";
import { User } from "@prisma/client";

interface UserInfoProps {
  user: User;
}

const UserInfo = async ({ user }: UserInfoProps) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar user={user} size={48} />
      <span>{user?.nickname || user?.name}</span>
    </div>
  );
};

export default UserInfo;
