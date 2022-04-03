import { _validateToken } from '../token.validator';

describe('ValidateToken', () => {
  it('should return false if given null', () => {
    const res = _validateToken(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateToken(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateToken('');

    expect(res).toBe(false);
  });

  it.each([
    ['a'],
    [
      'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
    ],
  ])('should return false if given an invalid token = "%s"', val => {
    const res = _validateToken(val);

    expect(res).toBe(false);
  });

  it.each([
    ['9245586d33c7cd71e2f75f48d2b212eae3556b2c90b6fa01abd607523418905c'],
    ['106f43edc50feefbee4a6018053952a6f9c6bedf768387198bad45f3f0d17eef'],
    ['2c57b568fd5a27e8e902c6bc24620246da9d9b97dbb83d33d86dfd6f53648e75'],
  ])('should return true if given a valid token = "%s"', val => {
    const res = _validateToken(val);

    expect(res).toBe(true);
  });
});
