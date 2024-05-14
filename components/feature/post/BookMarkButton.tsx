"use client"

import updateBookmark from "@/app/action/updateBookmark"
import { BookmarkIcon } from "lucide-react"
import { useOptimistic, useTransition } from "react"

interface BookmarkButtonProps {
  postId: string
  bookmarkedUsersId: string[]
  userId: string
}

const BookmarkButton = ({postId,bookmarkedUsersId,userId}:BookmarkButtonProps) => {
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


  const handleClick = () => {
    addOptimisticBookmarkedUsersId(optimisticBookmarkedUsersId)
    startTransition(() => {
      updateBookmark(postId,isActive)
    })
  }

  return (
    <BookmarkIcon onClick={handleClick} stroke={isActive ? 'blue' : 'currentColor'} fill={isActive ? 'blue' : 'none'}  />
  )
}

export default BookmarkButton