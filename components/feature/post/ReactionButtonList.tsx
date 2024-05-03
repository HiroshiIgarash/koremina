import { User, Video } from "@prisma/client"
import ReactionButton from "./ReactionButton"
import { Reaction } from "@/types/type"
import getCurrentUser from "@/app/action/getCurrentUser"

interface ReactionButtonListProps {
  post: Video & {[k in Reaction]:User[]}
}

const ReactionButtonList = async({ post }:ReactionButtonListProps) => {
  const currentUser = await getCurrentUser()

  if(!currentUser) return

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-4 items-start">
        <ReactionButton reaction="good" user={currentUser} post={post} display="👍" />
        <ReactionButton reaction="bad" user={currentUser} post={post} display="👎" />
      </div>
      <div className="flex gap-4 items-start">
        <ReactionButton reaction="love" user={currentUser} post={post} display="😍" />
        <ReactionButton reaction="funny" user={currentUser} post={post} display="🤣" />
        <ReactionButton reaction="cry" user={currentUser} post={post} display="😭" />
        <ReactionButton reaction="angel" user={currentUser} post={post} display="😇" />
      </div>
  </div>
  )
}

export default ReactionButtonList