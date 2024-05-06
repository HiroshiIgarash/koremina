"use client"

import getLivers from "@/app/action/getLivers"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Liver } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

interface PostFilterProps {
  filterLiversId: string | undefined
}

const PostFilter = ({ filterLiversId }: PostFilterProps) => {
  const [isPending, startTransition] = useTransition()
  const [isRoutingPending, startRoutingTransition] = useTransition()
  const [livers, setLivers] = useState<Liver[]>([])
  const router = useRouter()

  useEffect(() => {
    startTransition(() => {
      getLivers()
        .then(livers => setLivers(livers))
    })
  }, [])

  const filterLiver = livers.find(l => l.id === filterLiversId)

  const handleChange = (value: string) => {
    if (value === filterLiversId) return
    const href = value === 'all' ? '/page/' : `/page/?liver=${value}`
    startRoutingTransition(() => {
      router.push(href)
    })
  }

  const handleRandomClick = () => {
    const rand = Math.floor(Math.random() * livers.length + 1)
    const randomLiverId = livers[rand].id
    startRoutingTransition(() => {
      router.push(`/page/?liver=${randomLiverId}`)
    })
  }

  return (
    <div className="self-start mb-8 px-4 w-full max-w-7xl mx-auto">
      <Label>ライバーで絞り込む</Label>
      <div className="flex items-center gap-8 mt-2">
        <Select  onValueChange={handleChange} value={filterLiver?filterLiver?.id:'all'}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="ライバー絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              全て表示
            </SelectItem>
            {
              isPending ? (
                <SelectItem value="pending" disabled>
                  読み込み中...
                </SelectItem>
              ) : (
                livers.map(liver => (
                  <SelectItem
                    key={liver.id}
                    value={liver.id}
                  >
                    {liver.name}
                  </SelectItem>
                ))
              )
            }
          </SelectContent>
        </Select>
        <Button onClick={handleRandomClick}>ランダム</Button>
        {isRoutingPending && <span className="text-gray-400">検索中...</span>}
      </div>
    </div>
  )
}

export default PostFilter