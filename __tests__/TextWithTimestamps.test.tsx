import { render, screen, fireEvent } from "@testing-library/react";
import TextWithTimestamps from "../components/TextWithTimestamps";

// window.openのモック
const mockOpen = jest.fn();
Object.defineProperty(window, "open", {
  writable: true,
  value: mockOpen,
});

describe("TextWithTimestamps", () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it("タイムスタンプがない場合は通常のテキストを表示できること", () => {
    render(
      <TextWithTimestamps
        text="タイムスタンプのないテキストです"
        videoId="test-video-id"
      />
    );

    expect(
      screen.getByText("タイムスタンプのないテキストです")
    ).toBeInTheDocument();
  });

  it("クリック可能なタイムスタンプを表示できること", () => {
    render(
      <TextWithTimestamps
        text="1:23から始まる部分が面白いです"
        videoId="test-video-id"
      />
    );

    expect(screen.getByText("から始まる部分が面白いです")).toBeInTheDocument();

    const timestampButton = screen.getByRole("button", { name: "1:23" });
    expect(timestampButton).toBeInTheDocument();
    expect(timestampButton).toHaveAttribute("title", "YouTubeで1:23から再生");
  });

  it("複数のタイムスタンプを正しく処理できること", () => {
    const { container } = render(
      <TextWithTimestamps
        text="1:23から始まって12:34で盛り上がります"
        videoId="test-video-id"
      />
    );

    expect(screen.getByRole("button", { name: "1:23" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "12:34" })).toBeInTheDocument();

    // コンテナ全体のテキストコンテンツを確認
    expect(container.textContent).toBe("1:23から始まって12:34で盛り上がります");
  });

  it("タイムスタンプをクリックした時にYouTube URLを開けること", () => {
    render(
      <TextWithTimestamps text="1:23の部分をチェック" videoId="test-video-id" />
    );

    const timestampButton = screen.getByRole("button", { name: "1:23" });
    fireEvent.click(timestampButton);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=test-video-id&t=83s",
      "_blank"
    );
  });

  it("時:分:秒の形式を正しく処理できること", () => {
    render(
      <TextWithTimestamps
        text="1:23:45の長いタイムスタンプ"
        videoId="test-video-id"
      />
    );

    const timestampButton = screen.getByRole("button", { name: "1:23:45" });
    fireEvent.click(timestampButton);

    expect(mockOpen).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=test-video-id&t=5025s",
      "_blank"
    );
  });

  it("カスタムクラス名を適用できること", () => {
    const { container } = render(
      <TextWithTimestamps
        text="テストテキスト"
        videoId="test-video-id"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
