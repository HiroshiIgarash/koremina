"use client"
import updateLivers from "@/app/action/updateLivers"
import { Button } from "@/components/ui/button"
import { Liver } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useTransition } from "react"

const RegisterButton = () => {

  const [pending, startTransition] = useTransition()

  const handleClick = () => { 
    const liversJSON = [] as Liver[]
    const liverItems = document.querySelectorAll('.liverItem');

    liverItems.forEach(liverItem => {
      const pairs = [] as [string,any][]
      const inputs = liverItem.querySelectorAll('input');
      inputs.forEach(input => {
        const key = input.name;
        let value = input.value as any;
        switch (key) {
          case 'index':
            value = Number(value)
            break
          case 'aliasFirst':
            value = value || null
            break
          case 'aliasSecond':
            value = value || null
            break
          case 'isOverseas':
            value = !!Number(value)
            break
          case 'isRetire':
            value = !!Number(value)
            break
        }
        pairs.push([key, value])
      })
      const obj = Object.fromEntries(pairs) as unknown as Liver
      liversJSON.push(obj)
    })

    console.log(liversJSON)

    startTransition(async () => {
      await updateLivers(liversJSON)
    })
  }

  return (
    <Button onClick={handleClick} disabled={pending}>登録{pending && <Loader2 />}</Button>
  )
}

export default RegisterButton