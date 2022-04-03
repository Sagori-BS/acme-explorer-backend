import { _validateAddress } from '../address.validator';
import * as faker from 'faker';

describe('ValidateAddress', () => {
  it('should return false if given an empty string', () => {
    const res = _validateAddress('');

    expect(res).toBe(false);
  });

  it.each([[faker.lorem.word(3)], [faker.lorem.sentence(100)]])(
    'should return false if given an invalid name = "%s"',
    val => {
      const res = _validateAddress(val);

      expect(res).toBe(false);
    }
  );

  it.each([[faker.address.streetAddress(), faker.address.streetAddress()]])(
    'should return true if given a valid name = "%s"',
    val => {
      const res = _validateAddress(val);

      expect(res).toBe(true);
    }
  );
});
