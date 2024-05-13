"use client"

import updateReaction from "@/app/action/updateReaction"
import { Reaction } from "@/types/type"
import { User, Video } from "@prisma/client"
import clsx from "clsx"
import { useCallback, useOptimistic } from "react"

interface ReactionButtonProps {
  reaction: Reaction
  display: string
  user: User | null
  post: { [k in Reaction]: {id:string}[] } & {id:string}
}

const ReactionButton = ({ reaction, display, post, user }: ReactionButtonProps) => {
  const [optimisticReactionUsers, addOptimisticReactionUsers] = useOptimistic(
    post[reaction],
    (state, register:boolean) => {
      if (!user) return state
      if (register) {
        return state.filter(u => u.id !== user.id)
      } else {
        return [...state,user]
      }
    }
  )
  const active = !!user && optimisticReactionUsers.some(u => u.id === user.id)


  const handleReaction = useCallback((reaction: Reaction, register: boolean) => {
    if(!user) return
    addOptimisticReactionUsers(register)
    updateReaction(reaction, post.id, register, user)
  }, [addOptimisticReactionUsers, post.id, user])


  return (
    <button
    disabled={!user}
      className={
        clsx(
          "rounded-full w-14 px-2",
          user && "border",
          active && "bg-sky-50 border-sky-300"
        )
      }
      onClick={() => handleReaction(reaction, active)}>
      <span className="flex items-center justify-between">
        {display}
        <span className="text-xs">{ optimisticReactionUsers.length < 100 ? optimisticReactionUsers.length : "99+" }</span>
      </span>
    </button>
  )
}

export default ReactionButton