import * as faker from 'faker';
import { _validateUrlNullable } from '../url-nullable.validator';

describe('ValidateUrlNullable', () => {
  it('should return true if given null', () => {
    const res = _validateUrlNullable(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateUrlNullable(undefined);

    expect(res).toBe(true);
  });

  it('should return false given an empty string', () => {
    const res = _validateUrlNullable('');

    expect(res).toBe(false);
  });

  it('should return true if given a valid url', () => {
    const res = _validateUrlNullable(faker.image.imageUrl());

    expect(res).toBe(true);
  });
});
