import { render, screen } from "@testing-library/react";
import FavoriteLiversLoading from "@/components/feature/setting/FavoriteLiversLoading";

describe("FavoriteLiversLoading", () => {
  it("読み込み中メッセージが表示される", () => {
    render(<FavoriteLiversLoading />);
    
    const loadingText = screen.getByText("読み込み中...");
    expect(loadingText).toBeInTheDocument();
  });
});