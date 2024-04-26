"use client"

import getCurrentUser from "@/app/action/getCurrentUser"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import ChangeNicknameForm from "./ChangeNicknameForm"
import { useState } from "react"
import { User } from "@prisma/client"

const ChangeNicknameDialog = ({ children,user }: { children: React.ReactNode,user:User|null }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>ニックネームを編集</DialogTitle>
            <ChangeNicknameForm user={user} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeNicknameDialog