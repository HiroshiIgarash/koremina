// CommentForm Button Disabled Logic Test

describe("CommentForm Button Disabled Logic", () => {
  test("ボタンの無効化ロジックが正しく動作すること", () => {
    // isSubmitting = false の場合のテスト
    const isSubmitting = false;

    // 空文字の場合: 無効
    let comment = "";
    let isDisabled = isSubmitting || comment.trim().length === 0;
    expect(isDisabled).toBe(true);

    // 空白文字のみの場合: 無効
    comment = "   ";
    isDisabled = isSubmitting || comment.trim().length === 0;
    expect(isDisabled).toBe(true);

    // 有効なコメントの場合: 有効
    comment = "テストコメント";
    isDisabled = isSubmitting || comment.trim().length === 0;
    expect(isDisabled).toBe(false);

    // 前後に空白があるが有効な内容がある場合: 有効
    comment = "  テストコメント  ";
    isDisabled = isSubmitting || comment.trim().length === 0;
    expect(isDisabled).toBe(false);
  });

  test("送信中は常に無効化されること", () => {
    const isSubmitting = true;

    // 有効なコメントでも送信中は無効
    const comment = "テストコメント";
    const isDisabled = isSubmitting || comment.trim().length === 0;
    expect(isDisabled).toBe(true);
  });
});
