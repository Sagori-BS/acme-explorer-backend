import { _validateLongitudeNullable } from '../longitude-nullable.validator';

describe('ValidateLongitudeNullable', () => {
  it('should return true if given null', () => {
    const res = _validateLongitudeNullable(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateLongitudeNullable(undefined);

    expect(res).toBe(true);
  });

  it.each([[-181], [180.4]])(
    'should return false if given an invalid longitude = "%s"',
    val => {
      const res = _validateLongitudeNullable(val);

      expect(res).toBe(false);
    }
  );

  it.each([[-180, 179.3499454]])(
    'should return true if given a valid longitude = "%s"',
    val => {
      const res = _validateLongitudeNullable(val);

      expect(res).toBe(true);
    }
  );
});
