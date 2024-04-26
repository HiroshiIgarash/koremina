import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarProps {
  user: User | null
  size?: number
}

const Avatar = ({user,size = 48}:AvatarProps) => {

  if (!user || !user.image) {
    return null
  }


  return (
    <Image
    src={user.image}
    width={size}
    height={size}
    alt=""
    className="rounded-full border-2"
  />
  )
}

export default Avatar