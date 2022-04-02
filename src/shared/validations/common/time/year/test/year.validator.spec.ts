import { _validateYear } from '../year.validator';

describe('ValidateYear', () => {
  it('should return false given null', () => {
    const res = _validateYear(null);

    expect(res).toEqual(false);
  });

  it('should return false given undefined', () => {
    const res = _validateYear(undefined);

    expect(res).toEqual(false);
  });

  it.each([[2025], [1700], [2100]])(
    'should return false given an invalid year = "%s"',
    val => {
      const res = _validateYear(val);

      expect(res).toEqual(false);
    }
  );

  it.each([[1884], [2022], [2000]])(
    'should return true given a valid year = "%s"',
    val => {
      const res = _validateYear(val);
      expect(res).toEqual(true);
    }
  );
});
