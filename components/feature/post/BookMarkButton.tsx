"use client"

import updateBookmark from "@/app/action/updateBookmark"
import { User } from "@prisma/client"
import { BookmarkIcon } from "lucide-react"
import { useOptimistic, useTransition } from "react"

interface BookmarkButtonProps {
  postId: string
  bookmarkedUsersId: string[]
  user: User
}

const BookmarkButton = ({postId,bookmarkedUsersId,user}:BookmarkButtonProps) => {
  const [isPending,startTransition] = useTransition()
  const [optimisticBookmarkedUsersId, addOptimisticBookmarkedUsersId] = useOptimistic(
    bookmarkedUsersId, 
    (currentBookmarkedUsersId) => {
      if (currentBookmarkedUsersId.includes(user.id)) {
        return currentBookmarkedUsersId.filter(bookmarkedUserId => bookmarkedUserId !== user.id)
      } else {
        return [...currentBookmarkedUsersId, user.id]
      }
      
    }
  )
  const isActive = optimisticBookmarkedUsersId.includes(user.id)


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