import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FavoriteLiversSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-4 md:p-8 space-y-12">
        {/* 最推しライバー */}
        <div>
          <p className="font-semibold text-xl text-center my-4">
            最推しライバー
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <Skeleton className="rounded-full w-[200px] h-[200px]" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-48 mt-4" />
          </div>
        </div>

        {/* 推しライバー */}
        <div>
          <p className="font-semibold text-xl text-center my-4">推しライバー</p>
          <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
            <div className="text-center text-muted-foreground">
              読み込み中...
            </div>
            <Skeleton className="h-10 w-48 mt-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteLiversSkeleton;
