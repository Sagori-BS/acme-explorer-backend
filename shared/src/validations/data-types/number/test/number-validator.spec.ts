import { _validatePositiveNumber } from '../number.validator';

describe('ValidatePositiveNumber', () => {
  it('should return false if given 0', () => {
    const res = _validatePositiveNumber(0);

    expect(res).toBe(false);
  });
  it('should return false if given null', () => {
    const res = _validatePositiveNumber(null);

    expect(res).toBe(false);
  });
  it('should return false if given undefined', () => {
    const res = _validatePositiveNumber(undefined);

    expect(res).toBe(false);
  });
  it.each([[-12], [-67]])(
    'should return false if given a negative number = "%d"',
    (value: number) => {
      const res = _validatePositiveNumber(value);

      expect(res).toBe(false);
    }
  );

  it.each([[12], [34], [56], [78], [98]])(
    'should return true if given a positive number ="%d"',
    (value: number) => {
      const res = _validatePositiveNumber(value);

      expect(res).toBe(true);
    }
  );
});
