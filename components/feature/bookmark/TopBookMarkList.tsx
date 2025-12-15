import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import getRandomUnseenBookmarks from "@/app/action/getRandomUnseenBookmarks";
import { auth } from "@/auth";
import PostItem from "../post/PostItem";
import SkeletonPostItem from "../post/SkeletonPostItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const TopBookmarkList = async () => {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) return;

  // 最適化されたランダム未視聴ブックマーク取得
  const filteredUnseenBookmarks = await getRandomUnseenBookmarks({ 
    userId,
    limit: 4 
  });

  if (!filteredUnseenBookmarks.length) return;

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
          <ScrollArea className="max-w-screen">
            <div className="flex *:w-[calc(100vw-4rem)] *:shrink-0 md:*:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full md:max-w-7xl mx-auto">
              {filteredUnseenBookmarks.map(bookmark => {
                const { post } = bookmark;
                if (!post) return;
                return (
                  <Suspense key={post.id} fallback={<SkeletonPostItem />}>
                    <PostItem
                      id={post.id}
                      comment={post.comment}
                      videoId={post.videoId}
                      postedUserName={
                        post.postedUser.nickname || post.postedUser.name
                      }
                      postedUser={post.postedUser}
                      livers={post.liver}
                      bookmark={post.Bookmark}
                      reactionsCount={post._count}
                      seenUsersId={post.seenUsers.map(u => u.id)}
                    />
                  </Suspense>
                );
              })}
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

export default TopBookmarkList;
