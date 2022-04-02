import { _validateUrl } from '../url.validator';
import * as faker from 'faker';

describe('ValidateUrl', () => {
  it('should return false given an empty string', () => {
    const res = _validateUrl('');

    expect(res).toBe(false);
  });

  it('should return true if given a valid url', () => {
    const res = _validateUrl(faker.image.imageUrl());

    expect(res).toBe(true);
  });
});
