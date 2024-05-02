import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SkeltonPostItem = () => {
  return (
    <Card className="flex flex-col h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg md:h-[4em] leading-tight">
        <Skeleton className="h-4 w-full my-2" />
        <Skeleton className="h-4 w-full my-2" />
        <Skeleton className="h-4 w-1/3 my-2" />
      </CardTitle>
      <div className="flex justify-end items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </CardHeader>
    <CardContent className="grow space-y-2 pb-2">
      <Skeleton
        className="w-full aspect-video"
      />
      <Skeleton className="w-full h-4 my-2" />
      <Skeleton className="w-full h-4 my-2" />
    </CardContent>
    <CardFooter className="flex items-end flex-col space-y-2 text-sm">
      <div className="flex gap-2 justify-self-end">
        <span className=" rounded-full px-2">👍 3</span>
        <span className=" rounded-full px-2">👎 3</span>
      </div>
      <div className="flex gap-2">
        <span className=" rounded-full px-2">😍 3</span>
        <span className=" rounded-full px-2">🤣 3</span>
        <span className=" rounded-full px-2">😭 3</span>
        <span className=" rounded-full px-2">😇 3</span>
      </div>
    </CardFooter>
  </Card>
  )
}

export default SkeltonPostItem