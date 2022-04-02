import { _validateCode } from '../code.validator';

describe('ValidateCode', () => {
  it('should return true given null', () => {
    const res = _validateCode(null);

    expect(res).toEqual(true);
  });

  it('should return true given undefined', () => {
    const res = _validateCode(undefined);

    expect(res).toEqual(true);
  });

  it('should return true given an empty string', () => {
    const res = _validateCode('');

    expect(res).toEqual(true);
  });

  it.each([['usde'], ['edeeste'], ['comica']])(
    'should return false given an invalid currency = "%s"',
    val => {
      const res = _validateCode(val);

      expect(res).toEqual(false);
    }
  );

  it.each([['USD'], ['DOP'], ['MXN']])(
    'should return true given a valid currency = "%s"',
    val => {
      const res = _validateCode(val);
      expect(res).toEqual(true);
    }
  );
});
