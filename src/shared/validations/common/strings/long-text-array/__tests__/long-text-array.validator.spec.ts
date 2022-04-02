import { _validateLongTextArray } from '../long-text-array.validator';
import * as faker from 'faker';

describe('ValidateLongTextArray', () => {
  it('should return false if given null', () => {
    const res = _validateLongTextArray(null);

    expect(res).toBe(false);
  });

  it('should return true if given undefined', () => {
    const res = _validateLongTextArray(undefined);

    expect(res).toBe(false);
  });

  it.each([[['']], [[faker.datatype.string(), '']]])(
    'should return false if given an array with an empty string',
    (value: string[]) => {
      const res = _validateLongTextArray(value);

      expect(res).toBe(false);
    }
  );

  it.each([[['']], [[undefined, '']]])(
    'should return false if given an array with an undefined value',
    (value: string[]) => {
      const res = _validateLongTextArray(value);

      expect(res).toBe(false);
    }
  );

  it.each([[['']], [[null, '']]])(
    'should return false if given an array with an null value',
    (value: string[]) => {
      const res = _validateLongTextArray(value);

      expect(res).toBe(false);
    }
  );

  it.each([[['fasdfasdfsdfasdfasfasdfasdfffffff', 's']], [['henlo']]])(
    'should return true if given a valid string = "%s"',
    val => {
      const res = _validateLongTextArray(val);

      expect(res).toBe(true);
    }
  );
});
