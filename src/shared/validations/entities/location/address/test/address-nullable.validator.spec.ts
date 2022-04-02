import { _validateAddress } from '../address.validator';
import * as faker from 'faker';
import { _validateAddressNullable } from '../address-nullable.validator';

describe('ValidateAddressNullable', () => {
  it('should return true if given null', () => {
    const res = _validateAddressNullable(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateAddressNullable(undefined);

    expect(res).toBe(true);
  });

  it('should return false if given an empty string', () => {
    const res = _validateAddressNullable('');

    expect(res).toBe(false);
  });

  it.each([[faker.lorem.word(3)], [faker.lorem.sentence(200)]])(
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
