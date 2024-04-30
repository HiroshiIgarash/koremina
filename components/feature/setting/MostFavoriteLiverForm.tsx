"use client"

import { Button } from "@/components/ui/button"
import { Liver, User } from "@prisma/client"
import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react"
import { Form,FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import axios from "axios"
import updateMostFavoriteLiver from "@/app/action/updateMostFavoriteLiver"


interface MostFavoriteLiverFormProps {
  user: User | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const FormSchema = z.object({
  liverId: z.string().optional(),
})

const MostFavoriteLiverForm = ({ user, setOpen }: MostFavoriteLiverFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [livers,setLivers] = useState<Liver[]>()

  useEffect(() => {
    const fetchAndSetLivers = async () => {
      const livers = await axios.get('/api/liver')
      setLivers(livers.data)
    }

    fetchAndSetLivers()
  },[])
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async() => {
      const newMostFavoriteLiver = await updateMostFavoriteLiver(data)
      if (newMostFavoriteLiver !== 'Unauthorized') {
        toast({
          description: newMostFavoriteLiver ?
            `最推しライバーを${newMostFavoriteLiver.name}に登録しました。` :
            '最推しライバーを未設定にしました。'
        })
        setOpen(false)
      }
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="liverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ライバー選択</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="ライバーを選択" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[30vh]">
                  {livers?.map(liver => (
                    <SelectItem key={liver.id} value={liver.id}>{ liver.name }</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            form.formState.isSubmitting ||
            form.formState.isSubmitted
          }
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default MostFavoriteLiverForm