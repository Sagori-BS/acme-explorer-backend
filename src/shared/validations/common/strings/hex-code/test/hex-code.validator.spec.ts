import { _validateHexCode } from '../hex-code.validator';

describe('ValidateHexCode', () => {
  it('should return false if given null', () => {
    const res = _validateHexCode(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateHexCode(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an emptry string', () => {
    const res = _validateHexCode('');

    expect(res).toBe(false);
  });

  it.each([
    [''],
    ['not-a-hex-code'],
    ['123'],
    ['#12'],
    ['#123456789'],
    ['#aa'],
    ['#a1']
  ])('should return false if given an invalid hex code = "%s"', val => {
    const res = _validateHexCode(val);

    expect(res).toBe(false);
  });

  it.each([['#FF5733', '#B4968F']])(
    'should return true if given a valid name = "%s"',
    val => {
      const res = _validateHexCode(val);

      expect(res).toBe(true);
    }
  );
});
