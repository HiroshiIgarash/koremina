import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import getBookmarksById from "@/app/action/getBookmarksById"
import { auth } from "@/auth"
import PostItem from "../post/PostItem"
import SkeltonPostItem from "../post/SkeltonPostItem"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


/**
 * 配列から要素を指定個数抽出する
 * 
 * @param array 抽出する配列
 * @param count 抽出する要素の個数
 * @returns 
 */
function extractRandomElementsFromArray<T>(array: T[], count: number = array.length): T[] {
  const arr = [...array]

  const extractCount = Math.min(Math.max(count, 0), array.length)

  for (let arr_i = 0; arr_i < extractCount; arr_i++) {
    const swapElementIndex = Math.floor(Math.random() * array.length);
    [arr[arr_i], arr[swapElementIndex]] = [arr[swapElementIndex], arr[arr_i]];
  }

  const extractedElements = arr.slice(0, extractCount)

  return extractedElements;

}


const TopBookmarkList = async () => {

  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) return;

  const bookmarks = (await getBookmarksById({ userId }))

  const filteredBookmarks = extractRandomElementsFromArray(bookmarks, 4)

  if (!filteredBookmarks.length) return;

  return (
    <>
      <div className="w-full mb-8 md:mb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 px-4 w-full max-w-7xl mx-auto">あなたのブックマーク</h2>
        <p className="mb-4 px-4 w-full max-w-7xl mx-auto">あなたがブックマークをした動画です。<br />見逃したものはありませんか。</p>
        <div>
          <ScrollArea className="max-w-[100vw]">
            <div className="flex [&>*]:w-[calc(100vw_-_4rem)] [&>*]:shrink-0 md:[&>*]:w-auto md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full md:max-w-7xl mx-auto">
              {filteredBookmarks.map((bookmark) => {
                const { post } = bookmark
                if (!post) return
                return (
                  <Suspense key={post.id} fallback={<SkeltonPostItem />}>
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
                    />
                  </Suspense>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="px-4 w-full max-w-7xl mx-auto mt-4">
            <Button asChild><Link href="/bookmark">ブックマークを見る</Link></Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBookmarkList