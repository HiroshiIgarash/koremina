import dayjs from '../utils/dayjs';

describe('Birthday logic tests', () => {
  test('should calculate days until birthday correctly', () => {
    const today = dayjs('2024-01-15').tz();
    
    // Birthday is in the same year, after today (March 10)
    const birthDateSameYear = dayjs('2024-03-10').tz();
    const daysUntilSameYear = birthDateSameYear.diff(today, 'day');
    
    expect(daysUntilSameYear).toBeGreaterThan(0);
    expect(daysUntilSameYear).toBe(55); // Jan 15 to Mar 10
  });

  test('should handle year wraparound correctly', () => {
    const today = dayjs('2024-12-30').tz();
    
    // Birthday is January 5 next year
    let nextBirthday = dayjs('2024-01-05').tz();
    
    // If birthday is before today, add 1 year
    if (nextBirthday.isBefore(today, 'day') || nextBirthday.isSame(today, 'day')) {
      nextBirthday = nextBirthday.add(1, 'year');
    }
    
    const daysUntil = nextBirthday.diff(today, 'day');
    
    // Should be 6 days (Dec 30 -> Jan 5 next year)
    expect(daysUntil).toBe(6);
  });

  test('should handle today birthday correctly', () => {
    const today = dayjs('2024-01-15').tz();
    const todayBirthday = dayjs('2024-01-15').tz();
    
    const daysUntil = todayBirthday.diff(today, 'day');
    
    expect(daysUntil).toBe(0);
  });
});