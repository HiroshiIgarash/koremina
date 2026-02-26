import PostItem from "@/components/feature/post/PostItem";
import SearchForm from "@/components/feature/post/SearchForm";
import SearchPagination from "@/components/feature/post/SearchPagination";
import SkeletonPostItem from "@/components/feature/post/SkeletonPostItem";
import prisma from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async (props: PageProps<"/search">) => {
  const searchParams = await props.searchParams;
  if (Array.isArray(searchParams?.page)) notFound();
  if (Array.isArray(searchParams?.q)) notFound();

  // ページ番号のパース（非数値・負数・NaN の場合は1にフォールバック）
  const parsedPage = parseInt(searchParams?.page || "1", 10);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const postsPerPage = 16;

  if (!searchParams || !searchParams.q) {
    redirect("/");
  }

  const searchList = searchParams.q.split(" ").filter(s => s !== "");

  // 検索条件を共通化（count と findMany で同一条件を使うため）
  const whereCondition = {
    AND: searchList.map(word => {
      return {
        OR: [
          { comment: { contains: word } },
          { detailComment: { contains: word } },
          {
            liver: {
              some: {
                OR: [
                  { name: { contains: word } },
                  { aliasFirst: { contains: word } },
                  { aliasSecond: { contains: word } },
                ],
              },
            },
          },
        ],
      };
    }),
  };

  // count と findMany を並列実行してレスポンスを高速化
  const [count, posts] = await Promise.all([
    prisma.video.count({ where: whereCondition }),
    prisma.video.findMany({
      where: whereCondition,
      include: {
        postedUser: true,
        liver: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            good: true,
            bad: true,
            love: true,
            funny: true,
            cry: true,
            angel: true,
            comments: true,
            Bookmark: true,
          },
        },
      },
      skip: (currentPage - 1) * postsPerPage,
      take: postsPerPage,
    }),
  ]);

  return (
    <>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
          ワードで検索
        </h2>
        <SearchForm defaultValue={searchParams.q.toString()} />
      </div>
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
            {posts.map(post => (
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
                  bookmarkCount={post._count.Bookmark}
                  reactionsCount={post._count}
                />
              </Suspense>
            ))}
          </div>
          <div className="mt-8">
            <SearchPagination
              showPages={5}
              currentPage={currentPage}
              totalPosts={count}
              postsPerPage={postsPerPage}
              q={searchParams.q}
            />
          </div>
        </>
      ) : (
        <p>「{searchParams.q.toString()}」の検索結果はありません。</p>
      )}
    </>
  );
};

export default Page;
