"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useState,Dispatch, SetStateAction } from "react"
import updateNickname from "@/app/action/updateNickname"
import { useFormStatus } from "react-dom"
import { DialogClose } from "@/components/ui/dialog"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

interface ChangeNicknameFormProps {
  user: User | null
  setOpen: Dispatch<SetStateAction<boolean>>
}


const ChangeNicknameForm = ({user,setOpen}:ChangeNicknameFormProps) => {
  const [input, setInput] = useState<string>()
  const router = useRouter()

  return (
    <form action={
      async (formData) => {
        await updateNickname(formData)
        router.push('/setting')
        setOpen(false)
      }
    } className="flex items-center gap-4">
      <Input name="newNickname" defaultValue={user?.nickname || user?.name ||''} onChange={(e)=>setInput(e.target.value)} value={input} />
      <Button>変更</Button>
    </form>
    )
}

export default ChangeNicknameForm