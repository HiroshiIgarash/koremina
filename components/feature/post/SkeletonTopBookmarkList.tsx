import { Button } from "@/components/ui/button";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "lucide-react";
import SkeletonPostItem from "./SkeletonPostItem";

const SkeletonTopBookmarkList = () => {
  return (
    <>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
          未視聴のブックマーク
        </h2>
        <p className="mb-4 px-4 w-full max-w-7xl mx-auto">
          あなたがブックマークをした動画です。
          <br />
          見逃したものはありませんか？
        </p>
        <div>
          <ScrollArea className="max-w-[100vw]">
            <div className="flex [&>*]:w-[calc(100vw_-_4rem)] [&>*]:shrink-0 md:[&>*]:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full md:max-w-7xl mx-auto">
              <SkeletonPostItem />
              <SkeletonPostItem />
              <SkeletonPostItem />
              <SkeletonPostItem />
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="px-4 w-full max-w-7xl mx-auto mt-4">
            <Button asChild>
              <Link href="/bookmark">ブックマークを見る</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonTopBookmarkList;
