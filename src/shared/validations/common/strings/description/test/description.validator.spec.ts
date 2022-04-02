import { _validateDescription } from '../description.validator';
import * as faker from 'faker';

describe('ValidateDescription', () => {
  it('should return false if given an empty string', () => {
    const res = _validateDescription('');

    expect(res).toBe(false);
  });

  it.each([[faker.lorem.word(4)], [faker.lorem.paragraphs(75)]])(
    'should return false if given an invalid description = "%s"',
    val => {
      const res = _validateDescription(val);

      expect(res).toBe(false);
    }
  );

  it.each([[faker.lorem.word(5), faker.lorem.word(12)]])(
    'should return true if given a valid description = "%s"',
    val => {
      const res = _validateDescription(val);

      expect(res).toBe(true);
    }
  );
});
