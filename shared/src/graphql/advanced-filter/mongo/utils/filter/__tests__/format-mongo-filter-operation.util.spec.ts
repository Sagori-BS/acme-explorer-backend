import { IFormatMongooperationInput } from '../../../../interfaces/format-mongo-operation-input.interface';
import { formatMongoFilterOperation } from '../format-mongo-filter-operation.util';
import * as faker from 'faker';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { MongoFilterOperationEnum } from '../../../enum/mongo-filter-operation.enum';
import { GraphqlFilterOperationEnum } from '@user/graphql/advanced-filter/enum/graphql-filter-operation.enum';

const firstSuccessCase = () => {
  const value = faker.datatype.string();
  const fieldName = faker.random.alpha();

  const expectedResult = { [MongoFilterOperationEnum.$eq]: value };

  const input: IFormatMongooperationInput = {
    gqlOperation: GraphqlFilterOperationEnum.eq,
    mongoOperation: MongoFilterOperationEnum.$eq,
    value,
    fieldName,
  };

  return [input, expectedResult];
};

describe('FormatMongoOperation', () => {
  it('should throw an error if mongoOperation is null', () => {
    // arrange
    const fieldName = faker.random.alpha();

    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: null,
      value: faker.random.alphaNumeric(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if mongoOperation is undefined', () => {
    // arrange
    const fieldName = faker.random.alpha();

    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: undefined,
      value: faker.random.alphaNumeric(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if gqlOperation is null', () => {
    // arrange
    const fieldName = faker.random.alpha();

    const input: IFormatMongooperationInput = {
      gqlOperation: null,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: faker.random.alphaNumeric(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if gqlOperation is undefined', () => {
    // arrange
    const fieldName = faker.random.alpha();

    const input: IFormatMongooperationInput = {
      gqlOperation: undefined,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: faker.random.alphaNumeric(),
      fieldName,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if fieldName is null', () => {
    // arrange
    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: faker.random.alphaNumeric(),
      fieldName: null,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if fieldName is undefined', () => {
    // arrange
    const input: IFormatMongooperationInput = {
      gqlOperation: GraphqlFilterOperationEnum.contains,
      mongoOperation: MongoFilterOperationEnum.$eq,
      value: faker.random.alphaNumeric(),
      fieldName: undefined,
    };

    // act & assert
    expect(() => formatMongoFilterOperation(input)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it.each([firstSuccessCase()])(
    'should return the formatted mongo operation',
    (
      input: IFormatMongooperationInput,
      expectedResult: Record<string, any>,
    ) => {
      // arrange

      // act
      const res = formatMongoFilterOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
