const FavoriteLiversLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-96 mx-auto">
      <div className="grid grid-cols-[repeat(auto-fit,64px)] justify-center gap-2 w-full mb-4">
        {/* スケルトンアイコンを複数表示 */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"
          ></div>
        ))}
      </div>
      <p className="text-center text-gray-500">読み込み中...</p>
    </div>
  );
};

export default FavoriteLiversLoading;