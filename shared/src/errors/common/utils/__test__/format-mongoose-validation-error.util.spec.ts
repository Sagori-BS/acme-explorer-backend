import { Error as MongooseErrors } from 'mongoose';
import { IErrorDetail } from '@shared/errors/base-error.abstract';
import { formatMongooseValidationError } from '../format-mongoose-validation-error.util';

describe('FormatMongooseValidationError', () => {
  const errorMessage = 'Something went wrong';

  it('should return an empty array given null', () => {
    // arrange

    // act
    const res = formatMongooseValidationError(null);
    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array given undefined', () => {
    // arrange

    // act
    const res = formatMongooseValidationError(undefined);
    // assert
    expect(res).toEqual([]);
  });

  it('should skip values that are in the skip map', () => {
    // arrange
    const input = {
      errors: {
        slug: {
          message: errorMessage,
        },
      },
    };

    // act
    const res = formatMongooseValidationError(
      (input as unknown) as MongooseErrors.ValidationError,
    );
    // assert
    expect(res).toEqual([]);
  });

  const firstTestCase = () => {
    const input = {
      errors: {
        name: {
          message: errorMessage,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field: 'name',
        message: errorMessage,
      },
    ];

    return [input, expectedResult];
  };

  const secondTestCase = () => {
    const input = {
      errors: {
        name: {
          message: errorMessage,
        },
        slug: {
          message: errorMessage,
        },
      },
    };

    const expectedResult: IErrorDetail[] = [
      {
        field: 'name',
        message: errorMessage,
      },
    ];

    return [input, expectedResult];
  };

  it.each([firstTestCase(), secondTestCase()])(
    'should return an array of IErrorDetail',
    (input, expectedResult) => {
      // act
      const res = formatMongooseValidationError(
        (input as unknown) as MongooseErrors.ValidationError,
      );

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
