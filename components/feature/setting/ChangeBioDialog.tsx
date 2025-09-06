"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ChangeBioForm from "./ChangeBioForm";
import { useState } from "react";
import { User } from "@prisma/client";

const ChangeBioDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>自己紹介文を編集</DialogTitle>
          <ChangeBioForm user={user} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeBioDialog;
