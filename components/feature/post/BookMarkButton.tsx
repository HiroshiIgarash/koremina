"use client"

import { Bookmark } from "lucide-react"

interface BookmarkButtonProps {
  active? : boolean
}

const BookmarkButton = ({active}:BookmarkButtonProps) => {

  const handleClick = () => {
    updateBookmark()
  }

  return (
    <Bookmark onClick={handleClick} stroke={active ? 'blue' : 'currentColor'} fill={active ? 'blue' : 'none'}  />
  )
}

export default BookmarkButton