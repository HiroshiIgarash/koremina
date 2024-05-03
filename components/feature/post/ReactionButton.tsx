"use client"

import getPostById from "@/app/action/getPostById"
import updateReaction from "@/app/action/updateReaction"
import { Button } from "@/components/ui/button"
import { Reaction } from "@/types/type"
import { User, Video } from "@prisma/client"
import clsx from "clsx"
import { useCallback, useOptimistic } from "react"

interface ReactionButtonProps {
  reaction: Reaction
  display: string
  user: User
  post: Video & { [k in Reaction]: User[] }
}

const ReactionButton = ({ reaction, display, post, user }: ReactionButtonProps) => {
  const active = post[reaction].some(u => u.id === user.id)
  const [optimisticActive, addOptimisticActive] = useOptimistic(
    active,
    (state, newActive) => !state
  )


  const handleReaction = useCallback((reaction: Reaction, register: boolean) => {
    addOptimisticActive(active)
    updateReaction(reaction, post.id, register, user)
  }, [active, addOptimisticActive, post.id, user])


  return (
    <button
      className={
        clsx(
          "rounded-full border w-12",
          optimisticActive && "bg-sky-50 border-sky-300"
        )
      }
      onClick={() => handleReaction(reaction, active)}>
      {display}
    </button>
  )
}

export default ReactionButton