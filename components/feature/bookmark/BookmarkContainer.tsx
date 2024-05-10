import getBookmarksById from "@/app/action/getBookmarksById"
import getCurrentUser from "@/app/action/getCurrentUser"
import { notFound } from "next/navigation"

const BookmarkContainer = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser) notFound()

  const posts = await getBookmarksById({userId: currentUser.id})

  

  return (
    <div>
      Bookmark
    </div>
  )
}

export default BookmarkContainer