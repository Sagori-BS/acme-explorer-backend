import { _validateLatitudeNullable } from '../latitude-nullable.validator';

describe('ValidateLatitudeNullable', () => {
  it('should return true if given null', () => {
    const res = _validateLatitudeNullable(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateLatitudeNullable(undefined);

    expect(res).toBe(true);
  });

  it.each([[-91], [90.4]])(
    'should return false if given an invalid latitude = "%s"',
    val => {
      const res = _validateLatitudeNullable(val);

      expect(res).toBe(false);
    }
  );

  it.each([[-90, 89.934354464574]])(
    'should return true if given a valid latitude = "%s"',
    val => {
      const res = _validateLatitudeNullable(val);

      expect(res).toBe(true);
    }
  );
});
