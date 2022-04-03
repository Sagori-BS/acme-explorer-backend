import { IErrorDetail } from '@shared/errors/base-error.abstract';
import { formatJoiValidationError } from '../format-joi-validation-error.util';
import * as joi from 'joi';

describe('FormatJoiValidationError', () => {
  const field = 'name';
  const error = '"name" need to be a string';
  const message = 'Need to be a string';

  it('should return an empty array given null', () => {
    // arrange

    // act
    const res = formatJoiValidationError(null);
    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array given undefined', () => {
    // arrange

    // act
    const res = formatJoiValidationError(undefined);
    // assert
    expect(res).toEqual([]);
  });

  const firstTestCase = () => {
    const input = {
      details: {
        name: {
          message: error,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field: 'name',
        message,
      },
    ];

    return [input, expectedResult];
  };

  const secondTestCase = () => {
    const input = {
      details: {
        name: {
          message: error,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field,
        message,
      },
    ];

    return [input, expectedResult];
  };

  it.each([firstTestCase(), secondTestCase()])(
    'should return an array of IErrorDetail',
    (input, expectedResult) => {
      // act
      const res = formatJoiValidationError(
        (input as unknown) as joi.ValidationError,
      );

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
