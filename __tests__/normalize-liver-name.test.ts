import { normalizeLiverName } from "../lib/normalizeLiverName";

// 見た目では判別できない特殊空白を定数に隔離して使用する
const NBSP = " ";
const IDEOGRAPHIC_SPACE = "　";

describe("normalizeLiverName", () => {
  test("ノーブレークスペース(U+00A0)を通常スペースに正規化すること", () => {
    expect(normalizeLiverName(`トゥイスティー${NBSP}アマノザコ`)).toBe(
      "トゥイスティー アマノザコ"
    );
  });

  test("全角スペース(U+3000)を通常スペースに正規化すること", () => {
    expect(
      normalizeLiverName(`トゥイスティー${IDEOGRAPHIC_SPACE}アマノザコ`)
    ).toBe("トゥイスティー アマノザコ");
  });

  test("連続する空白を1つにまとめること", () => {
    expect(normalizeLiverName("ユ  ルリ")).toBe("ユ ルリ");
  });

  test("前後の空白を除去すること", () => {
    expect(normalizeLiverName(" 月ノ美兎 ")).toBe("月ノ美兎");
  });

  test("通常の名前はそのまま返すこと", () => {
    expect(normalizeLiverName("ぽむ・れいんぱふ")).toBe("ぽむ・れいんぱふ");
  });

  test("表記揺れした同名同士が一致すること", () => {
    expect(normalizeLiverName(`トゥイスティー${NBSP}アマノザコ`)).toBe(
      normalizeLiverName("トゥイスティー アマノザコ")
    );
  });
});
