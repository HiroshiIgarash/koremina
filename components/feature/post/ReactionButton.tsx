"use client"

import updateReaction from "@/app/action/updateReaction"
import { Button } from "@/components/ui/button"
import { Reaction } from "@/types/type"
import { useCallback } from "react"

interface ReactionButtonProps {
  reaction: Reaction
  postId: string
  active: boolean
  display: string
}

const ReactionButton = ({reaction,active,display,postId}:ReactionButtonProps) => {

  const handleReaction = useCallback((reaction: Reaction,register:boolean) => {
    updateReaction(reaction,postId,register)
  },[postId])


  return (
    <Button onClick={()=>handleReaction('good',true)}>{display}</Button>
  )
}

export default ReactionButton