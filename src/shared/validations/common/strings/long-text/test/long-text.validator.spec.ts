import { _validateLongText } from '../long-text.validator';

describe('ValidateLongText', () => {
  it('should return false if given null', () => {
    const res = _validateLongText(null);

    expect(res).toBe(false);
  });

  it('should return true if given undefined', () => {
    const res = _validateLongText(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateLongText('');

    expect(res).toBe(false);
  });

  it.each([['fasdfasdfsdfasdfasfasdfasdfffffff', 's']])(
    'should return true if given a valid string = "%s"',
    val => {
      const res = _validateLongText(val);

      expect(res).toBe(true);
    }
  );
});
