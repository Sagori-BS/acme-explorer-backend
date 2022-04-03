import { InternalServerError } from '@shared/errors/common/internal-server.error';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import {
  GraphqlFilterOperation,
  GraphqlFilterOperationEnum,
} from '@user/graphql/advanced-filter/enum/graphql-filter-operation.enum';
import {
  MongoFilterOperationEnum,
  MongoOperation,
} from '../../../enum/mongo-filter-operation.enum';
import { getMongoFilterOperation } from '../get-mongo-filter-operation';

describe('GetMongoOperation', () => {
  it('should throw an error if given null', () => {
    // arrange & act & assert
    expect(() => getMongoFilterOperation(null)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given undefined', () => {
    // arrange & act & assert
    expect(() => getMongoFilterOperation(undefined)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if given an empty string', () => {
    // arrange & act & assert
    expect(() => getMongoFilterOperation(<GraphqlFilterOperation>'')).toThrow(
      MissingRequiredParametersError,
    );
  });

  it.each([
    ['no_op'],
    ['another_no_op'],
    ['eq_no_op'],
    ['no_op_also_here'],
    ['nearly_op_eq'],
  ])(
    'should throw an error if it cannot find a corresponding mongo operation -> "%s"',
    input => {
      // arrange & act & assert
      expect(() =>
        getMongoFilterOperation(<GraphqlFilterOperation>input),
      ).toThrow(InternalServerError);
    },
  );

  it.each([
    [GraphqlFilterOperationEnum.contains, MongoFilterOperationEnum.$regex],
    [GraphqlFilterOperationEnum.eq, MongoFilterOperationEnum.$eq],
    [GraphqlFilterOperationEnum.gt, MongoFilterOperationEnum.$gt],
    [GraphqlFilterOperationEnum.gte, MongoFilterOperationEnum.$gte],
    [GraphqlFilterOperationEnum.in, MongoFilterOperationEnum.$in],
    [GraphqlFilterOperationEnum.lt, MongoFilterOperationEnum.$lt],
    [GraphqlFilterOperationEnum.lte, MongoFilterOperationEnum.$lte],
    [GraphqlFilterOperationEnum.ncontains, MongoFilterOperationEnum.$regex],
    [GraphqlFilterOperationEnum.ne, MongoFilterOperationEnum.$ne],
    [GraphqlFilterOperationEnum.near, MongoFilterOperationEnum.$near],
    [GraphqlFilterOperationEnum.nin, MongoFilterOperationEnum.$nin],
  ])(
    'should return a mongo operation given a valid GraphqlOperation -> "%s"',
    (input: GraphqlFilterOperation, expectedResult: MongoOperation) => {
      // arrange & act
      const res = getMongoFilterOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
