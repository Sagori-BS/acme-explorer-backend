import { InvalidGqlSortOperationError } from '@shared/errors/filters/invalid-gql-sort-operation.error';
import { InvalidSortQueryError } from '@shared/errors/filters/invalid-sort-query.error';
import { GraphqlSortOperationEnum } from '@user/graphql/advanced-filter/enum/graphql-sort-operation.enum';
import { MongoSortOperationEnum } from '../../../enum/mongo-sort-operation.enum';
import { sortQueryBuilder } from '../sort-query-builder.util';

describe('SortQueryBuilder', () => {
  it('should return an empty object given null', () => {
    // arrange & act
    const res = sortQueryBuilder(null);

    // assert
    expect(res).toEqual({});
  });

  it('should return an empty object given undefined', () => {
    // arrange & act
    const res = sortQueryBuilder(undefined);

    // assert
    expect(res).toEqual({});
  });

  it('should return an empty object given undefined', () => {
    // arrange & act
    const res = sortQueryBuilder({});

    // assert
    expect(res).toEqual({});
  });

  it('should throw an error given a query object with a invalid sort operations', () => {
    // arrange
    const input = {
      price: 'dasc',
      year: 'desc',
    };

    // act & assert
    expect(() => sortQueryBuilder(input)).toThrow(InvalidGqlSortOperationError);
  });

  it('should throw an error given a query object with more than one sort operation on nested fields', () => {
    // arrange
    const input = {
      price: { basePrice: GraphqlSortOperationEnum.asc },
      model: { slug: GraphqlSortOperationEnum.desc },
    };

    // act & assert
    expect(() => sortQueryBuilder(input)).toThrow(InvalidSortQueryError);
  });

  it('should throw an error given a query object with one sort operation on nested fields and one or more sort operations on normal fields', () => {
    // arrange
    const input = {
      price: { basePrice: GraphqlSortOperationEnum.asc },
      model: GraphqlSortOperationEnum.desc,
    };

    // act & assert
    expect(() => sortQueryBuilder(input)).toThrow(InvalidSortQueryError);
  });

  it('should return a query object given a valid sort object', () => {
    // arrange
    const input = {
      price: 'asc',
      year: 'desc',
    };

    const expectedResult = {
      price: MongoSortOperationEnum.asc,
      year: MongoSortOperationEnum.desc,
    };

    // act
    const res = sortQueryBuilder(input);

    // assert
    expect(res).toEqual(expectedResult);
  });

  it('should return a sort query object if given a valid sortOptions object with nested fields', () => {
    //   arrange
    const input = {
      brand: {
        slug: GraphqlSortOperationEnum.asc,
      },
    };

    const exptectedResult = {
      'brand.slug': MongoSortOperationEnum.asc,
    };

    // act
    const res = sortQueryBuilder(input);

    // assert
    expect(res).toEqual(exptectedResult);
  });
});
