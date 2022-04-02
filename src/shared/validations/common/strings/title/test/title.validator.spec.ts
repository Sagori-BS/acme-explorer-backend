import { _validateTitle } from '../title.validator';

describe('ValidateTitle', () => {
  it('should return false given an empty string', () => {
    const res = _validateTitle('');

    expect(res).toBe(false);
  });

  it('should return false given null', () => {
    const res = _validateTitle(null);

    expect(res).toBe(false);
  });

  it('should return false given undefined', () => {
    const res = _validateTitle(undefined);

    expect(res).toBe(false);
  });

  it.each([
    [''],
    ['a'],
    ['qwertyuiopasdfghjklzxcvbnmmnbvcxzlkjhgfdsapoiuytrewq']
  ])('should return false given an invalid string = "%s"', (value: string) => {
    const res = _validateTitle(value);

    expect(res).toBe(false);
  });

  it.each([
    ['valid string'],
    ['another valid string'],
    ['maybe a valid string too']
  ])('should return true given a valid string = "%s"', (value: string) => {
    const res = _validateTitle(value);

    expect(res).toBe(true);
  });
});
