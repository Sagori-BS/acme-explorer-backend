import { _validateNullableGreaterOrEqualThanZero } from '../nullable-greater-or-equal-than-zero.validator';

describe('ValidateGreaterOrEqualThanZero', () => {
  it.each([[-12], [-127], [-1204]])(
    'should return false given a negative number',
    value => {
      const res = _validateNullableGreaterOrEqualThanZero(value);

      expect(res).toBe(false);
    }
  );

  it('should return true given null', () => {
    const res = _validateNullableGreaterOrEqualThanZero(null);

    expect(res).toBe(true);
  });

  it('should return true given undefined', () => {
    const res = _validateNullableGreaterOrEqualThanZero(undefined);

    expect(res).toBe(true);
  });

  it('should return true given 0', () => {
    const res = _validateNullableGreaterOrEqualThanZero(0);

    expect(res).toBe(true);
  });

  it.each([[27], [89], [76], [908]])(
    'should return true given a positive number',
    (value: number) => {
      const res = _validateNullableGreaterOrEqualThanZero(value);

      expect(res).toBe(true);
    }
  );
});
