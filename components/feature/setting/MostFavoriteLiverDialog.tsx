"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import MostFavoriteLiverForm from "./MostFavoriteLiverForm"
import { useState } from "react"
import { User } from "@prisma/client"

const MostFavoriteLiverDialog = ({ children,user }: { children: React.ReactNode,user:User|null }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>ニックネームを編集</DialogTitle>
            <MostFavoriteLiverForm user={user} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MostFavoriteLiverDialog