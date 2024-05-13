import BookmarkContainer from "@/components/feature/bookmark/BookmarkContainer";

interface ISearchParams {
  page: string;
}

const Page = ({ searchParams }: { searchParams?: ISearchParams }) => {
  const currentPage = parseInt(searchParams?.page || "1");
  const postsPerPage = 16;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">ブックマーク</h1>
      <BookmarkContainer
        currentPage={currentPage}
        postsPerPage={postsPerPage}
      />
    </div>
  );
};

export default Page;
