import DateUtils from './DateUtils';

describe('DateUtils class', () => {
  const instance = new DateUtils();

  it('must be defined', () => {
    expect(DateUtils).toBeDefined();
  });

  it('an instance must have a isLeapYear method', () => {
    expect(instance.isLeapYear).toBeDefined();
  });

  it('returns true for leap years', () => {
    const leapYears = [1200, 2000, 2004];

    leapYears.forEach((leapYear) => {
      expect(instance.isLeapYear(leapYear)).toBe(true);
    });
  });

  it('returns false for not leap years', () => {
    const notLeapYears = [1299, 1800, 2001];

    notLeapYears.forEach((notLeapYear) => {
      expect(instance.isLeapYear(notLeapYear)).toBe(false);
    });
  });
});
