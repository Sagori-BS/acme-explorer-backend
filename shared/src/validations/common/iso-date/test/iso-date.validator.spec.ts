import { _validateIsoDate } from '../iso-date.validator';

describe('IsoDateValidator', () => {
  it('should return false if given an empty string', () => {
    const res = _validateIsoDate('');

    expect(res).toBe(false);
  });

  it.each([['2021-'], ['2021-13'], ['2021-02-29'], ['2021-17-32']])(
    'should return false if given an invalid date = "%s"',
    (value: string) => {
      const res = _validateIsoDate(value);

      expect(res).toBe(false);
    },
  );

  it.each([[new Date().toISOString()], ['2020-02-29'], ['2019-03-17']])(
    'should return true if given a valid date = "%s"',
    (value: string) => {
      const res = _validateIsoDate(value);

      expect(res).toBe(true);
    },
  );
});
