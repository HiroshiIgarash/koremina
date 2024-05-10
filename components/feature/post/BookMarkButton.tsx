"use client"

import updateBookmark from "@/app/action/updateBookmark"
import { Bookmark } from "lucide-react"
import { useOptimistic, useTransition } from "react"

interface BookmarkButtonProps {
  postId: string
  active? : boolean
}

const BookmarkButton = ({postId,active}:BookmarkButtonProps) => {
  const [isPending,startTransition] = useTransition()
  const [optimisticActive, addOptimisticActive] = useOptimistic(
    active, 
    (currentActive) => !currentActive
  )

  const handleClick = () => {
    addOptimisticActive(optimisticActive)
    startTransition(() => {
      updateBookmark(postId,!!optimisticActive)
    })
  }

  return (
    <Bookmark onClick={handleClick} stroke={optimisticActive ? 'blue' : 'currentColor'} fill={optimisticActive ? 'blue' : 'none'}  />
  )
}

export default BookmarkButton