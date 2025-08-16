import { Suspense } from "react";
import PostItem from "./PostItem";
import SkeletonPostItem from "./SkeletonPostItem";
import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SpecialList = async () => {
  const posts = await prisma.video.findMany({
    where: {
      liver: {
        some: {
          name: "不破湊",
        },
      },
    },
    include: {
      postedUser: true,
      liver: {
        select: {
          name: true,
        },
      },
      Bookmark: true,
      _count: {
        select: {
          good: true,
          bad: true,
          love: true,
          funny: true,
          cry: true,
          angel: true,
          comments: true,
        },
      },
      seenUsers: true,
    },
    orderBy: {
      postedAt: "desc",
    },
  });

  return (
    <>
      <div className="overflow-x-auto w-screen md:w-auto">
        <div className="flex *:w-[calc(100vw-4rem)] *:shrink-0 md:*:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
          {posts.map(post => {
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
      </div>
      <div className="px-4 w-full max-w-7xl mx-auto mt-4">
        <Button asChild>
          <Link href="/page?liver=clvkcl4c90026mp9w2ow7z1lv">
            不破湊のおすすめ動画を見る
          </Link>
        </Button>
      </div>
    </>
  );
};

export default SpecialList;
