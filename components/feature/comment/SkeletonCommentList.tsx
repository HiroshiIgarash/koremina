import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCommentList = () => {
  return (
    <Card>
      <CardHeader className="pb-2 flex-row justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-20 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-4" />
      </CardContent>
    </Card>
  )
}

export default SkeletonCommentList