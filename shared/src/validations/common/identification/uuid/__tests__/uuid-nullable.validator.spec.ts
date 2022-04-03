import { _validateNullableUuid } from '../uuid-nullable.validator';

describe('ValidateNullableUuid', () => {
  it('should return false if given undefined', () => {
    const res = _validateNullableUuid(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateNullableUuid('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['145465765765a'], ['1234-4354-3-543-43-53']])(
    'should return false if given an invalid uuid = "%s"',
    (value: string) => {
      const res = _validateNullableUuid(value);

      expect(res).toBe(false);
    },
  );

  it('should return true if given null', () => {
    const res = _validateNullableUuid(null);

    expect(res).toBe(true);
  });

  it.each([
    ['1b52e119-c80d-415f-9f87-081df7c80558'],
    ['6805d36a-e0ad-40f2-9bcf-31e3295a8c62'],
    ['865d97c1-da01-4308-b15b-ae90732958ae'],
  ])('should return true if given a valid uuid = "%s"', (value: string) => {
    const res = _validateNullableUuid(value);

    expect(res).toBe(true);
  });
});
