import { render, screen } from "@testing-library/react";
import FavoriteLiversLoading from "@/components/feature/setting/FavoriteLiversLoading";

describe("FavoriteLiversLoading", () => {
  it("読み込み中メッセージが表示される", () => {
    render(<FavoriteLiversLoading />);
    
    const loadingText = screen.getByText("読み込み中...");
    expect(loadingText).toBeInTheDocument();
  });

  it("スケルトンアニメーションが表示される", () => {
    render(<FavoriteLiversLoading />);
    
    // 推しライバー一覧用のスケルトン（64x64）が8個
    const listSkeletons = document.querySelectorAll('.w-16.h-16');
    expect(listSkeletons).toHaveLength(8);
  });

  it("アニメーションクラスが適用されている", () => {
    render(<FavoriteLiversLoading />);
    
    const animatedElements = document.querySelectorAll('.animate-pulse');
    expect(animatedElements.length).toBeGreaterThan(0);
  });
});