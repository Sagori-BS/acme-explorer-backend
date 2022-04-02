import { _validateNullableLongText } from '../long-text-nullable.validator';

describe('ValidateNullableLongText', () => {
  it('should return true if given null', () => {
    const res = _validateNullableLongText(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateNullableLongText(undefined);

    expect(res).toBe(true);
  });

  it('should return false if given an empty string', () => {
    const res = _validateNullableLongText('');

    expect(res).toBe(false);
  });

  it.each([['fasdfasdfsdfasdfasfasdfasdfffffff', 's']])(
    'should return true if given a valid string = "%s"',
    val => {
      const res = _validateNullableLongText(val);

      expect(res).toBe(true);
    }
  );
});
