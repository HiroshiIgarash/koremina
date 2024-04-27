"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@radix-ui/react-separator"

const Loading = () => {
  return (
    <div className="grid md:grid-cols-2 max-w-7xl mx-auto md:gap-x-4 gap-y-4 px-4 w-full">
      <div>
        <div className="sticky top-28 space-y-4">
          <Skeleton className="full h-auto aspect-video" />
          <Button className="bg-[rgba(204,0,0,0.9)] hover:bg-[rgba(204,0,0,0.8)]">
            Youtubeで視聴する
          </Button>
        </div>
      </div>
      <div>

        <Card>
          <CardHeader className="space-y-4 pb-0">
            <CardTitle className="leading-tight">
              <Skeleton className="w-full h-6 my-2" />
              <Skeleton className="w-1/2 h-6 my-2" />
            </CardTitle>
            <div className="flex items-center gap-2 my-8">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-20 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="my-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Loading