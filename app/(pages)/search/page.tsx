import PostItem from "@/components/feature/post/PostItem";
import SearchForm from "@/components/feature/post/SearchForm";
import SearchPagination from "@/components/feature/post/SearchPagination";
import SkeletonPostItem from "@/components/feature/post/SkeletonPostItem";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { comment } from "postcss";
import { Suspense } from "react";

const Page = async (props: PageProps<"/search">) => {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(
    Array.isArray(searchParams?.page)
      ? searchParams.page[0] || "1"
      : searchParams?.page || "1"
  );
  const postsPerPage = 16;

  if (!searchParams || !searchParams.q) {
    redirect("/");
  }

  const queryString = Array.isArray(searchParams.q)
    ? searchParams.q[0]
    : searchParams.q;
  const searchList = queryString.split(" ").filter(s => s !== "");

  const count = await prisma.video.count({
    where: {
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
    },
  });

  const posts = await prisma.video.findMany({
    where: {
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
    skip: (currentPage - 1) * postsPerPage,
    take: postsPerPage,
  });

  return (
    <>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="font-bold mb-4 px-4 w-full max-w-7xl mx-auto">
          ワードで検索
        </h2>
        <SearchForm defaultValue={queryString} />
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
                  bookmark={post.Bookmark}
                  reactionsCount={post._count}
                  seenUsersId={post.seenUsers.map(u => u.id)}
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
              q={queryString}
            />
          </div>
        </>
      ) : (
        <p>「{queryString}」の検索結果はありません。</p>
      )}
    </>
  );
};

export default Page;
