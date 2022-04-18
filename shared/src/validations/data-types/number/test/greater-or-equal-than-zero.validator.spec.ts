import { _validateGreaterOrEqualThan0 } from '../greater-or-equal-than-zero.validator';

describe('ValidateGreaterOrEqualThanZero', () => {
  it('should return false given null', () => {
    const res = _validateGreaterOrEqualThan0(null);

    expect(res).toBe(false);
  });

  it('should return false given undefined', () => {
    const res = _validateGreaterOrEqualThan0(undefined);

    expect(res).toBe(false);
  });

  it.each([[-12], [-127], [-1204], [-0]])(
    'should return false given a negative number',
    () => {
      const res = _validateGreaterOrEqualThan0(null);

      expect(res).toBe(false);
    }
  );

  it('should return true given 0', () => {
    const res = _validateGreaterOrEqualThan0(0);

    expect(res).toBe(true);
  });

  it.each([[27], [89], [76], [908]])(
    'should return true given a positive number',
    (value: number) => {
      const res = _validateGreaterOrEqualThan0(value);

      expect(res).toBe(true);
    }
  );
});
