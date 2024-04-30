"use client"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import FavoriteLiversForm from "./FavoriteLiversForm"
import { useState } from "react"
import { Liver, User } from "@prisma/client"

const FavoriteLiversDialog = ({ children, user }: { children: React.ReactNode, user: User & {favoriteLivers: Liver[]} |null }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4 items-start">
          <DialogTitle>ニックネームを編集</DialogTitle>
            <FavoriteLiversForm user={user} setOpen={setOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default FavoriteLiversDialog