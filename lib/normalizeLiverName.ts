/**
 * ライバー名の照合用に正規化する。
 *
 * 過去に liver.json とDBの間でノーブレークスペース(U+00A0)と
 * 通常スペースの表記揺れが発生し、名前照合の失敗により
 * 本番DBへ重複レコードが作成された。見た目が同じでも内部表現が
 * 異なる文字列同士を一致させるため、NFKC 正規化と空白類の統一を
 * 行ってから比較すること。
 */
export const normalizeLiverName = (name: string): string =>
  name.normalize("NFKC").replace(/\s+/g, " ").trim();
