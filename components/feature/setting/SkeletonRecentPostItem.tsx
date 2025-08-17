import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRecentPostItem = () => {
  return (
    <Card className="flex h-full sm:max-lg:flex-col gap-4 p-8">
      <div className="w-[49%] sm:max-lg:w-full shrink-0">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="h-2 w-full my-2" />
        <Skeleton className="h-2 w-full my-2" />
      </div>
      <div className="flex flex-col justify-between grow">
        <CardTitle className="text-lg md:h-[4em] leading-tight">
          <Skeleton className="h-6 w-full my-2" />
          <Skeleton className="h-6 w-1/2 my-2" />
        </CardTitle>
      </div>
    </Card>
  );
};

export default SkeletonRecentPostItem;
