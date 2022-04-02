import { _validateIsoCountryCode } from '../iso-country-code.validator';

describe('IsoCountryCodeValidator', () => {
  it('should return false if given false', () => {
    const res = _validateIsoCountryCode(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateIsoCountryCode(undefined);

    expect(res).toBe(false);
  });

  it('should return false if giving an empty string', () => {
    const res = _validateIsoCountryCode('');

    expect(res).toBe(false);
  });

  it.each([['XX'], ['QWERTY'], ['India'], ['DO']])(
    'should return false if given an invalid country code = %s',
    (value: string) => {
      const res = _validateIsoCountryCode(value);

      expect(res).toBe(false);
    }
  );

  it.each([['USA'], ['DOM'], ['COL'], ['MEX'], ['JAM']])(
    'should return true if given a valid ISO3 country code = %s',
    (value: string) => {
      const res = _validateIsoCountryCode(value);

      expect(res).toBe(true);
    }
  );
});
