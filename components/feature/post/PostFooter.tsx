import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const PostFooter = () => {
  return (
    <div  className="fixed p-4 bottom-0 w-full bg-white border-t">
      <form className="flex gap-4 items-end">
        <Textarea className="resize-none" />
        <Button>送信</Button>
      </form>
    </div>
  )
}

export default PostFooter