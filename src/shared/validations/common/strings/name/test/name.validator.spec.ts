import { _validateName } from '../name.validator';
import * as faker from 'faker';

describe('ValidateName', () => {
  it('should return false if given null', () => {
    const res = _validateName(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateName(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateName('');

    expect(res).toBe(false);
  });

  it.each([[''], [faker.lorem.words(30)]])(
    'should return false if given an invalid name = "%s"',
    val => {
      const res = _validateName(val);

      expect(res).toBe(false);
    }
  );

  it.each([[faker.lorem.word(3), faker.lorem.word(7)]])(
    'should return true if given a valid name = "%s"',
    val => {
      const res = _validateName(val);

      expect(res).toBe(true);
    }
  );
});
