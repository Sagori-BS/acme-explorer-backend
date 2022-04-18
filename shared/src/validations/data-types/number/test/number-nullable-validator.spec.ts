import { _validatePositiveNullableNumber } from '../number-nullable.validator';
import * as faker from 'faker';

describe('ValidatePositiveNullableNumber', () => {
  it('should return false if given 0', () => {
    const res = _validatePositiveNullableNumber(0);

    expect(res).toBe(false);
  });

  it('should return true if given null', () => {
    const res = _validatePositiveNullableNumber(null);

    expect(res).toBe(true);
  });

  it('should return false if given undefined', () => {
    const res = _validatePositiveNullableNumber(undefined);

    expect(res).toBe(false);
  });

  it.each([
    [faker.datatype.number({ max: 0 })],
    [faker.datatype.number({ max: 0 })]
  ])(
    'should return false if given a negative number = "%d"',
    (value: number) => {
      const res = _validatePositiveNullableNumber(value);

      expect(res).toBe(false);
    }
  );

  it.each([
    [faker.datatype.number({ min: 1 })],
    [faker.datatype.number({ min: 1 })],
    [faker.datatype.number({ min: 1 })],
    [faker.datatype.number({ min: 1 })],
    [faker.datatype.number({ min: 1 })]
  ])('should return true if given a positive number ="%d"', (value: number) => {
    const res = _validatePositiveNullableNumber(value);

    expect(res).toBe(true);
  });
});
