import SkeltonPostItem from "@/components/feature/post/SkeltonPostItem"

const Loading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 w-full max-w-7xl mx-auto">
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
      <SkeltonPostItem />
    </div>
  )
}

export default Loading