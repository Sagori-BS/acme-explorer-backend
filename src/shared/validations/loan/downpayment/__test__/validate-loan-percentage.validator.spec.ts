import { _validateLoanPercentage } from '../validate-loan-percentage.validator';
import * as faker from 'faker';

describe('ValidateLoanPercentage', () => {
  it('should return false given null', () => {
    const res = _validateLoanPercentage(null);

    expect(res).toBe(false);
  });

  it('should return false given undefined', () => {
    const res = _validateLoanPercentage(undefined);

    expect(res).toBe(false);
  });

  it.each([
    [faker.datatype.number({ min: -1000, max: -1 })],
    [faker.datatype.number({ min: -1000, max: -1 })],
    [faker.datatype.number({ min: -1000, max: -1 })],
    [faker.datatype.number({ min: -1000, max: -1 })]
  ])('should return false given a negative number', () => {
    const res = _validateLoanPercentage(null);

    expect(res).toBe(false);
  });

  it('should return true given 0', () => {
    const res = _validateLoanPercentage(0);

    expect(res).toBe(true);
  });

  it.each([
    [faker.datatype.number({ min: 0, max: 100 })],
    [faker.datatype.number({ min: 0, max: 100 })],
    [faker.datatype.number({ min: 0, max: 100 })],
    [faker.datatype.number({ min: 0, max: 100 })]
  ])('should return true given a positive number', (value: number) => {
    const res = _validateLoanPercentage(value);

    expect(res).toBe(true);
  });
});
