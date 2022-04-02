import * as faker from 'faker';
import { _validateDrivingLicense } from '../driving-license.validator';

describe('ValidateDrivingLicense', () => {
  it('should return false given an empty string', () => {
    const res = _validateDrivingLicense('');

    expect(res).toEqual(false);
  });

  it('should return true given null', () => {
    const res = _validateDrivingLicense(null);

    expect(res).toEqual(true);
  });

  it.each([
    [faker.datatype.number({ min: 1, max: 9999999999 }).toString()],
    [
      faker.datatype
        .number({ min: 100000000000, max: 10000000000000 })
        .toString()
    ],
    [faker.lorem.sentence()],
    [faker.lorem.paragraph()],
    [faker.datatype.string(11)]
  ])('should return false given an invalid driving license = "%s"', val => {
    const res = _validateDrivingLicense(val);

    expect(res).toEqual(false);
  });

  it.each([
    [faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString()],
    [faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString()]
  ])('should return true given a valid driving license = "%s"', val => {
    const res = _validateDrivingLicense(val);
    expect(res).toEqual(true);
  });
});
