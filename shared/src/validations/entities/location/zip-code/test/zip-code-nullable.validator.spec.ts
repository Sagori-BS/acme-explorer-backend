import { _validateZipCode } from '../zip-code-nullable.validator';

describe('ValidateZipCodeNullable', () => {
  it('should return true if given null', () => {
    const res = _validateZipCode(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateZipCode(undefined);

    expect(res).toBe(true);
  });

  it('should return false if given an empty string', () => {
    const res = _validateZipCode('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid zipCode = "%s"',
    val => {
      const res = _validateZipCode(val);

      expect(res).toBe(false);
    }
  );

  it.each([['113', '11516']])(
    'should return true if given a valid zipCode = "%s"',
    val => {
      const res = _validateZipCode(val);

      expect(res).toBe(true);
    }
  );
});
