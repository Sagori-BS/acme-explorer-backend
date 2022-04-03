import { getGqlOperation } from '../get-graphql-operation.util';
import { IGetGraphqlOperationResult } from '../../interfaces/get-graphql-operation-result.interface';
import { InvalidFieldNameFilterError } from '@shared/errors/filters/invalid-field-name-filter.error';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { InvalidGqlFilterOperationError } from '@shared/errors/filters/invalid-gql-filter-operation.error';

describe('getGqlOperation', () => {
  it('should throw an erro if the input is null', () => {
    // arrange & act & assert
    expect(() => getGqlOperation(null)).toThrow(MissingRequiredParametersError);
  });

  it('should throw an error if the input is undefined', () => {
    // arrange & act & assert
    expect(() => getGqlOperation(undefined)).toThrow(
      MissingRequiredParametersError,
    );
  });

  it('should throw an error if the input is an empty string', () => {
    // arrange & act & assert
    expect(() => getGqlOperation('')).toThrow(MissingRequiredParametersError);
  });

  it.each([
    ['a_wrongly_formatted_field'],
    ['another_wrongly_formatted_field'],
    ['this_is_another_wrongly_formatted_field'],
  ])(
    'should throw an error if the input string has more than one _ -> "%s"',
    (input: string) => {
      // arrange & act & assert
      expect(() => getGqlOperation(input)).toThrow(InvalidFieldNameFilterError);
    },
  );

  it.each([
    ['category_name'],
    ['random_field'],
    ['no_operation'],
    ['fake_filter'],
  ])(
    // TODO: CHange description to a clearer one
    'should throw an error if given a field name with an undefined gql operation',
    (input: string) => {
      // arrange & act & assert
      expect(() => getGqlOperation(input)).toThrow(
        InvalidGqlFilterOperationError,
      );
    },
  );

  it.each([
    ['category_in', { fieldName: 'category', gqlOperation: 'in' }],
    ['year_gte', { fieldName: 'year', gqlOperation: 'gte' }],
  ])(
    'should return the field name and the gql operation',
    (input: string, expectedResult: IGetGraphqlOperationResult) => {
      // arrange & act
      const res = getGqlOperation(input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
