import { GraphqlSortOperationEnum } from '@user/graphql/advanced-filter/enum/graphql-sort-operation.enum';
import { MongoSortOperationEnum } from '../../../enum/mongo-sort-operation.enum';
import { sortAggregationPipelineBuilder } from '../sort-aggregation-pipeline-builder';

describe('SortAggregationPipelineBuilder', () => {
  it('should return an empty array if gieven a null sortOptions object', () => {
    // act
    const res = sortAggregationPipelineBuilder([], null);

    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array if gieven a undefined sortOptions object', () => {
    // act
    const res = sortAggregationPipelineBuilder([], undefined);

    // assert
    expect(res).toEqual([]);
  });

  it('should return an empty array if gieven an empty sortOptions object', () => {
    // act
    const res = sortAggregationPipelineBuilder([], {});

    // assert
    expect(res).toEqual([]);
  });

  it('should return an array with a sort stage if given a valid sortOptions object', () => {
    //   arrange
    const sortOptions = {
      year: GraphqlSortOperationEnum.asc,
      title: GraphqlSortOperationEnum.desc,
    };

    const exptectedResult = [
      {
        $sort: {
          year: MongoSortOperationEnum.asc,
          title: MongoSortOperationEnum.desc,
        },
      },
    ];

    // act
    const res = sortAggregationPipelineBuilder([], sortOptions);

    // assert
    expect(res).toEqual(exptectedResult);
  });

  it('should return an array with a sort stage if given a valid sortOptions object with nested fields', () => {
    //   arrange
    const sortOptions = {
      brand: {
        slug: GraphqlSortOperationEnum.asc,
      },
    };

    const exptectedResult = [
      {
        $sort: {
          'brand.slug': MongoSortOperationEnum.asc,
        },
      },
    ];

    // act
    const res = sortAggregationPipelineBuilder([], sortOptions);

    // assert
    expect(res).toEqual(exptectedResult);
  });
});
