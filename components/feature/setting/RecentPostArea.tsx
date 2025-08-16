import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import SkeletonRecentPostItem from "./SkeletonRecentPostItem";
import RecentPostList from "./RecentPostList";

const RecentPostArea = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の投稿</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 px-4 max-w-7xl mx-auto">
        <Suspense fallback={<SkeletonRecentPostItem />}>
          <RecentPostList />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default RecentPostArea;
