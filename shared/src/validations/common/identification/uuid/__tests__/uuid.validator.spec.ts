import { _validateUuid } from '../uuid.validator';

describe('ValidateUuid', () => {
  it('should return false if given null', () => {
    const res = _validateUuid(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateUuid(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateUuid('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid uuid = "%s"',
    val => {
      const res = _validateUuid(val);

      expect(res).toBe(false);
    },
  );

  it.each([
    [
      'bf720498-bd73-46be-bdb3-2ea8aed60ba4',
      'f85a0bb4-0eb7-48d3-a216-081561c6adfe',
    ],
  ])('should return true if given a valid uuid = "%s"', val => {
    const res = _validateUuid(val);

    expect(res).toBe(true);
  });
});
