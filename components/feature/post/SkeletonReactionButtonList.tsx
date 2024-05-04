import SkeletonReactionButton from "./SkeletonReactionButton"

const SkeletonReactionButtonList = () => {

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-4 items-start">
        <SkeletonReactionButton />
        <SkeletonReactionButton />
      </div>
      <div className="flex gap-4 items-start">
      <SkeletonReactionButton />
      <SkeletonReactionButton />
      <SkeletonReactionButton />
      <SkeletonReactionButton />
      </div>
  </div>
  )
}

export default SkeletonReactionButtonList