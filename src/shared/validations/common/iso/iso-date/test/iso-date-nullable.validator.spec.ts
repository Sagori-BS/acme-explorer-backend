import { _validateIsoDateNullable } from '../iso-date-nullable.validator';

describe('IsoDateValidator', () => {
  it('should return true if given null', () => {
    const res = _validateIsoDateNullable(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateIsoDateNullable(undefined);

    expect(res).toBe(true);
  });

  it('should return true if given an empty string', () => {
    const res = _validateIsoDateNullable('');

    expect(res).toBe(true);
  });

  it.each([['2021-'], ['2021-13'], ['2021-02-29'], ['2021-17-32']])(
    'should return false if given an invalid date = "%s"',
    (value: string) => {
      const res = _validateIsoDateNullable(value);

      expect(res).toBe(false);
    }
  );

  it.each([[new Date().toISOString()], ['2020-02-29'], ['2019-03-17']])(
    'should return true if given a valid date = "%s"',
    (value: string) => {
      const res = _validateIsoDateNullable(value);
      expect(res).toBe(true);
    }
  );
});
