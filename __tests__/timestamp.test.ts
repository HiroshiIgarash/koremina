import { 
  timestampToSeconds, 
  extractTimestamps, 
  TIMESTAMP_REGEX 
} from '../utils/timestamp';

describe('タイムスタンプユーティリティ', () => {
  describe('timestampToSeconds', () => {
    it('mm:ss形式を秒に変換できること', () => {
      expect(timestampToSeconds('1:23')).toBe(83);
      expect(timestampToSeconds('12:34')).toBe(754);
      expect(timestampToSeconds('00:30')).toBe(30);
    });

    it('h:mm:ss形式を秒に変換できること', () => {
      expect(timestampToSeconds('1:23:45')).toBe(5025);
      expect(timestampToSeconds('2:00:00')).toBe(7200);
      expect(timestampToSeconds('0:05:30')).toBe(330);
    });

    it('hh:mm:ss形式を正しく処理できること', () => {
      expect(timestampToSeconds('12:34:56')).toBe(45296);
    });

    it('無効な形式の場合は0を返すこと', () => {
      expect(timestampToSeconds('invalid')).toBe(0);
      expect(timestampToSeconds('1:2')).toBe(0); // seconds must be 2 digits
      expect(timestampToSeconds('123:45')).toBe(0); // minutes too long
    });
  });

  describe('extractTimestamps', () => {
    it('テキストからタイムスタンプを抽出できること', () => {
      const text = 'この動画の1:23と12:34の部分が面白いです！';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(2);
      expect(timestamps[0].timestamp).toBe('1:23');
      expect(timestamps[0].seconds).toBe(83);
      expect(timestamps[1].timestamp).toBe('12:34');
      expect(timestamps[1].seconds).toBe(754);
    });

    it('時:分:秒のタイムスタンプを抽出できること', () => {
      const text = '1:23:45の部分をチェック！';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(1);
      expect(timestamps[0].timestamp).toBe('1:23:45');
      expect(timestamps[0].seconds).toBe(5025);
    });

    it('複数のタイムスタンプを正しく処理できること', () => {
      const text = '1:23から始まって、12:34で盛り上がり、1:23:45で終わります';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(3);
      expect(timestamps.map(t => t.timestamp)).toEqual(['1:23', '12:34', '1:23:45']);
    });

    it('タイムスタンプが見つからない場合は空の配列を返すこと', () => {
      const text = 'タイムスタンプがないテキストです';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(0);
    });

    it('無効なタイムスタンプ形式にマッチしないこと', () => {
      const text = '1:2 は無効で、123:45 も無効、1:234 も無効です';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(0);
    });
  });

  describe('TIMESTAMP_REGEX', () => {
    it('有効なタイムスタンプ形式にマッチすること', () => {
      expect('1:23'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('12:34'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('1:23:45'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('12:34:56'.match(TIMESTAMP_REGEX)).toBeTruthy();
    });

    it('無効な形式にマッチしないこと', () => {
      expect('1:2'.match(TIMESTAMP_REGEX)).toBeNull(); // seconds must be 2 digits
      expect('123:45'.match(TIMESTAMP_REGEX)).toBeNull(); // minutes too long
      expect('1:234'.match(TIMESTAMP_REGEX)).toBeNull(); // seconds too long
    });
  });
});