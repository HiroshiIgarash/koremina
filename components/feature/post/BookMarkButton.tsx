"use client"

import updateBookmark from "@/app/action/updateBookmark"
import { BookmarkIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useOptimistic, useTransition } from "react"

interface BookmarkButtonProps {
  postId: string
  bookmarkedUsersId: string[]
  userId: string
}

const BookmarkButton = ({postId,bookmarkedUsersId,userId}:BookmarkButtonProps) => {
  const {resolvedTheme} = useTheme()
  const [isPending,startTransition] = useTransition()
  const [optimisticBookmarkedUsersId, addOptimisticBookmarkedUsersId] = useOptimistic(
    bookmarkedUsersId, 
    (currentBookmarkedUsersId) => {
      if (currentBookmarkedUsersId.includes(userId)) {
        return currentBookmarkedUsersId.filter(bookmarkedUserId => bookmarkedUserId !== userId)
      } else {
        return [...currentBookmarkedUsersId, userId]
      }
      
    }
  )
  const isActive = optimisticBookmarkedUsersId.includes(userId)
  const activeColor = resolvedTheme === "dark" ? "currentColor" : "orange"


  const handleClick = () => {
    addOptimisticBookmarkedUsersId(optimisticBookmarkedUsersId)
    startTransition(() => {
      updateBookmark(postId,isActive)
    })
  }

  return (
    <BookmarkIcon onClick={handleClick} stroke={isActive ? activeColor : 'currentColor'} fill={isActive ? activeColor : 'none'}  />
  )
}

export default BookmarkButton