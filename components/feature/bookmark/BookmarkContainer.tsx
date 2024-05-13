import getBookmarksById from "@/app/action/getBookmarksById"
import getCurrentUser from "@/app/action/getCurrentUser"
import { notFound } from "next/navigation"

const BookmarkContainer = async () => {

  const currentUser = await getCurrentUser()

  if(!currentUser) notFound()

  const bookmarks = await getBookmarksById({userId: currentUser.id})

  

  return (
    <div>
      {
        bookmarks?.map(bookmark => {
          const {post} = bookmark
          return (
            <div key={post.id}>
              <p>{post.id}</p>
              <p>{post.comment}</p>
              <p>{bookmark.createdAt.toISOString()}</p>
            </div>
        )
        })
      }
    </div>
  )
}

export default BookmarkContainer