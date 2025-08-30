import { 
  timestampToSeconds, 
  extractTimestamps, 
  TIMESTAMP_REGEX 
} from '../utils/timestamp';

describe('timestamp utilities', () => {
  describe('timestampToSeconds', () => {
    it('should convert mm:ss format to seconds', () => {
      expect(timestampToSeconds('1:23')).toBe(83);
      expect(timestampToSeconds('12:34')).toBe(754);
      expect(timestampToSeconds('00:30')).toBe(30);
    });

    it('should convert h:mm:ss format to seconds', () => {
      expect(timestampToSeconds('1:23:45')).toBe(5025);
      expect(timestampToSeconds('2:00:00')).toBe(7200);
      expect(timestampToSeconds('0:05:30')).toBe(330);
    });

    it('should handle hh:mm:ss format', () => {
      expect(timestampToSeconds('12:34:56')).toBe(45296);
    });

    it('should return 0 for invalid format', () => {
      expect(timestampToSeconds('invalid')).toBe(0);
      expect(timestampToSeconds('1:2')).toBe(0); // seconds must be 2 digits
      expect(timestampToSeconds('123:45')).toBe(0); // minutes too long
    });
  });

  describe('extractTimestamps', () => {
    it('should extract timestamps from text', () => {
      const text = 'この動画の1:23と12:34の部分が面白いです！';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(2);
      expect(timestamps[0].timestamp).toBe('1:23');
      expect(timestamps[0].seconds).toBe(83);
      expect(timestamps[1].timestamp).toBe('12:34');
      expect(timestamps[1].seconds).toBe(754);
    });

    it('should extract hour:minute:second timestamps', () => {
      const text = '1:23:45の部分をチェック！';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(1);
      expect(timestamps[0].timestamp).toBe('1:23:45');
      expect(timestamps[0].seconds).toBe(5025);
    });

    it('should handle multiple timestamps', () => {
      const text = '1:23から始まって、12:34で盛り上がり、1:23:45で終わります';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(3);
      expect(timestamps.map(t => t.timestamp)).toEqual(['1:23', '12:34', '1:23:45']);
    });

    it('should return empty array when no timestamps found', () => {
      const text = 'タイムスタンプがないテキストです';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(0);
    });

    it('should not match invalid timestamp formats', () => {
      const text = '1:2 は無効で、123:45 も無効、1:234 も無効です';
      const timestamps = extractTimestamps(text);
      
      expect(timestamps).toHaveLength(0);
    });
  });

  describe('TIMESTAMP_REGEX', () => {
    it('should match valid timestamp formats', () => {
      expect('1:23'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('12:34'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('1:23:45'.match(TIMESTAMP_REGEX)).toBeTruthy();
      expect('12:34:56'.match(TIMESTAMP_REGEX)).toBeTruthy();
    });

    it('should not match invalid formats', () => {
      expect('1:2'.match(TIMESTAMP_REGEX)).toBeNull(); // seconds must be 2 digits
      expect('123:45'.match(TIMESTAMP_REGEX)).toBeNull(); // minutes too long
      expect('1:234'.match(TIMESTAMP_REGEX)).toBeNull(); // seconds too long
    });
  });
});