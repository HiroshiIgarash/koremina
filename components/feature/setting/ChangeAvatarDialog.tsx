"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import ChangeAvatarForm from "./ChangeAvatarForm"
import { useState } from "react"
import { User } from "@prisma/client"

const ChangeAvatarDialog = ({ children,user }: { children: React.ReactNode,user:User|null }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>アバター画像の編集</DialogTitle>
            <ChangeAvatarForm user={user} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ChangeAvatarDialog