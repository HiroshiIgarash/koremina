import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonUserInfo = async () => {
  return (
    <div className="flex items-center gap-2 mt-0">
      <Skeleton className="w-12 h-12 rounded-full" />
      <Skeleton className="w-20 h-4" />
    </div>
  );
};

export default SkeletonUserInfo;
