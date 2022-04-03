import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { InvalidMongoSortOperarationError } from '@shared/errors/filters/invalid-mongo-sort-operation.error';
import {
  GraphqlSortOperation,
  GraphqlSortOperationEnum,
} from '@user/graphql/advanced-filter/enum/graphql-sort-operation.enum';
import { MongoSortOperationEnum } from '../../../enum/mongo-sort-operation.enum';
import { getMongoSortOperation } from '../get-mongo-sort-operation.util';

describe('GetMongoSortOpertion', () => {
  it('should throw an error if given null', () => {
    // arrange & act & assert
    expect(() => getMongoSortOperation(null)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given undefined', () => {
    // arrange & act & assert
    expect(() => getMongoSortOperation(undefined)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given an empty string', () => {
    // arrange & act & assert
    expect(() => getMongoSortOperation(<GraphqlSortOperation>'')).toThrow(
      MissingRequiredParametersError,
    );
  });

  it.each([['no_op'], ['another_no_op']])(
    'should throw an error if it does not find a mongo sort operation',
    input => {
      // arrange & act & assert
      expect(() => getMongoSortOperation(<GraphqlSortOperation>input)).toThrow(
        InvalidMongoSortOperarationError,
      );
    },
  );

  it.each([
    [GraphqlSortOperationEnum.asc, MongoSortOperationEnum.asc],
    [GraphqlSortOperationEnum.desc, MongoSortOperationEnum.desc],
  ])(
    'should return the correct mongo sort operation given a valid input',
    (input, expectedResult) => {
      // arrange & act
      const res = getMongoSortOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
