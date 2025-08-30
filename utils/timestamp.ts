/**
 * タイムスタンプの正規表現パターン
 * mm:ss または h:mm:ss または hh:mm:ss 形式をマッチ
 * 例: 1:23, 12:34, 1:23:45, 12:34:56
 */
export const TIMESTAMP_REGEX = /\b(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\b/g;

/**
 * タイムスタンプ文字列を秒数に変換する
 * @param timestampStr - タイムスタンプ文字列（例: "1:23", "1:23:45"）
 * @returns 秒数
 */
export function timestampToSeconds(timestampStr: string): number {
  const match = timestampStr.match(/^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})$/);
  
  if (!match) {
    return 0;
  }

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * テキスト内のタイムスタンプを検出し、位置情報とともに返す
 * @param text - 検索対象のテキスト
 * @returns タイムスタンプの配列（開始位置、終了位置、タイムスタンプ文字列、秒数を含む）
 */
export function extractTimestamps(text: string) {
  const timestamps: Array<{
    start: number;
    end: number;
    timestamp: string;
    seconds: number;
  }> = [];

  const regex = new RegExp(TIMESTAMP_REGEX);
  let match;

  while ((match = regex.exec(text)) !== null) {
    const timestamp = match[0];
    const seconds = timestampToSeconds(timestamp);
    
    timestamps.push({
      start: match.index,
      end: match.index + timestamp.length,
      timestamp,
      seconds,
    });
  }

  return timestamps;
}