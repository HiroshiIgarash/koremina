import { auth, signIn } from "@/auth"
import PostForm from "@/components/feature/post/PostForm"

const Page = async() => {
  const session = await auth()
  if(!session) {
    await signIn(undefined, {redirectTo:'/post'})
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <PostForm />
    </div>
  )
}

export default Page