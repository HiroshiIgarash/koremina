import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { SquarePen } from "lucide-react";
import React from "react";
import ChangeNicknameDialog from "./ChangeNicknameDialog";
import ChangeAvatarDialog from "./ChangeAvatarDialog";
import getCurrentUserWithTag from "@/app/action/getCurrentUserWithTag";

const UserInfo = async () => {
  const currentUser = await getCurrentUserWithTag();

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ChangeAvatarDialog user={currentUser}>
          <Avatar user={currentUser} size={48} />
        </ChangeAvatarDialog>
        <span>{currentUser?.nickname || currentUser?.name}</span>
        <ChangeNicknameDialog user={currentUser}>
          <SquarePen size="1em" />
        </ChangeNicknameDialog>
        <div className="ml-8">
          <SignOutButton />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">ユーザーID: {currentUser?.id}</p>
    </div>
  );
};

export default UserInfo;
