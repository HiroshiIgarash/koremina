import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeltonPostDetailCard() {
  return (
    <Card className="relative">
      <CardHeader className="space-y-4 pb-0">
        <CardTitle className="leading-tight pr-20">
          <Skeleton className="h-4" />
        </CardTitle>
        <Skeleton className="h-4 ml-auto w-1/3" />
      </CardHeader>
      <CardContent>
        <div className="mt-2 flex flex-wrap gap-2">
          <Skeleton className="h-4 rounded-full" />
        </div>
        <Skeleton className="h-4" />
        <Separator className="my-4" />
        <Skeleton className="h-4" />
      </CardContent>
    </Card>
  );
}
