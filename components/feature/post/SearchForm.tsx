'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, FormEvent, useState, useTransition } from "react"

interface SearchFormProps {
  defaultValue?: string
}

const SearchForm = ({ defaultValue }: SearchFormProps) => {
  const [input, setInput] = useState(defaultValue ?? '')
  const [isRoutingPending, startRoutingTransition] = useTransition()
  const router = useRouter()

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    params.set('q', input.replaceAll('　', ' '))
    startRoutingTransition(() => {
      router.push(`/search?${params}`)
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <form className="px-4" onSubmit={handleSearch}>
        <div className="flex items-center gap-4">
          <Input className="w-7xl text-base" onChange={handleInput} value={input} defaultValue={defaultValue} />
          <Button className="shrink-0" size="icon" disabled={!input}>
            <Search />
          </Button>
        </div>
        {isRoutingPending && <p className="mt-4 text-muted-foreground">検索中...</p>}
      </form>
    </div>
  )
}

export default SearchForm