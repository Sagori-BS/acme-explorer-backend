import { _validateIdNullable } from '../id.-nullable.validator';

describe('ValidateID', () => {
  it('should return false if given null', () => {
    const res = _validateIdNullable(null);

    expect(res).toBe(true);
  });

  it('should return false if given undefined', () => {
    const res = _validateIdNullable(undefined);

    expect(res).toBe(true);
  });

  it('should return false if given an empty string', () => {
    const res = _validateIdNullable('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid ID = "%s"',
    val => {
      const res = _validateIdNullable(val);

      expect(res).toBe(false);
    },
  );

  it.each([['5fcfa592ff275a0024e49f6c', '60218abd6e6f89002b8bfbaa']])(
    'should return true if given a valid Id = "%s"',
    val => {
      const res = _validateIdNullable(val);

      expect(res).toBe(true);
    },
  );
});
