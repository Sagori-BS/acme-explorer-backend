import * as faker from 'faker';
import { Types } from 'mongoose';
import { filterAggregationPipelineBuilder } from '../filter-aggregation-pipeline-builder.util';

describe('FilterAggregationPipelineBuilder', () => {
  it('should return an empty array given an empty object', () => {
    // arrange & act
    const res = filterAggregationPipelineBuilder([], {});

    // assert
    expect(res).toEqual([]);
  });

  describe('No nested fields ', () => {
    it('should return the correct match stage given a filterInput without nested fields', () => {
      // arrange
      const id = new Types.ObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $eq: id },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        bodyStyle: id.toHexString(),
      };

      // act
      const res = filterAggregationPipelineBuilder([], filterOptions);

      // assert
      expect(res).toEqual(expectedResult);
    });

    const firstSuccessCaseWithArrays = () => {
      const id1 = new Types.ObjectId();
      const id2 = new Types.ObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $in: [id1, id2] },
          },
        },
      ];

      const input: Record<string, any> = {
        bodyStyle_in: [id1.toHexString(), id2.toHexString()],
      };

      return [input, expectedResult];
    };

    const secondSuccessCaseWithArrays = () => {
      const id1 = new Types.ObjectId();
      const id2 = new Types.ObjectId();

      const expectedResult = [
        {
          $match: {
            bodyStyle: { $in: [id1, id2] },
            year: { $gte: 2014, $lt: 2020 },
          },
        },
      ];

      const input: Record<string, any> = {
        bodyStyle_in: [id1.toHexString(), id2.toHexString()],
        year_gte: 2014,
        year_lt: 2020,
      };

      return [input, expectedResult];
    };

    it.each([firstSuccessCaseWithArrays(), secondSuccessCaseWithArrays()])(
      'should return the correct match stage given a filterInput without nested fields that has array values',
      (input, expectedResult) => {
        // arrange & act
        const res = filterAggregationPipelineBuilder([], input);

        // assert
        expect(res).toEqual(expectedResult);
      },
    );
  });

  describe('Nested fields', () => {
    const firstSuccessCase = () => {
      const categorySlug = faker.random.alpha({ upcase: false });
      const expectedResult = [
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories: {
          slug: categorySlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    const secondSuccessCase = () => {
      const categorySlug = faker.random.alpha({ upcase: false });
      const categoryName = faker.random.alpha();

      const expectedResult = [
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
            'categories.name': { $eq: categoryName },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories: {
          slug: categorySlug,
          name: categoryName,
        },
      };

      return [filterOptions, expectedResult];
    };

    it.each([firstSuccessCase(), secondSuccessCase()])(
      'should return the correct match stage given a filterInput with nested fields',
      (input, expectedResult) => {
        // arrange & act
        const res = filterAggregationPipelineBuilder([], input);

        // assert
        expect(res).toEqual(expectedResult);
      },
    );
  });

  describe('Nested fields and non nested fields', () => {
    const firstSuccessCase = () => {
      const categorySlug = faker.random.alpha({ upcase: false });
      const id1 = new Types.ObjectId();
      const id2 = new Types.ObjectId();

      const expectedResult = [
        {
          $match: {
            categories: { $in: [id1, id2] },
          },
        },
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories_in: [id1.toHexString(), id2.toHexString()],
        categories: {
          slug: categorySlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    const secondSuccessCase = () => {
      const categorySlug = faker.random.alpha({ upcase: false });
      const modelSlug = faker.vehicle.manufacturer();
      const id1 = new Types.ObjectId();
      const id2 = new Types.ObjectId();
      const id3 = new Types.ObjectId();
      const id4 = new Types.ObjectId();

      const expectedResult = [
        {
          $match: {
            categories: { $in: [id1, id2] },
            brand: { $in: [id3, id4] },
          },
        },
        {
          $match: {
            'categories.slug': { $eq: categorySlug },
            'model.slug': { $eq: modelSlug },
          },
        },
      ];

      const filterOptions: Record<string, any> = {
        categories_in: [id1.toHexString(), id2.toHexString()],
        categories: {
          slug: categorySlug,
        },
        brand_in: [id3.toHexString(), id4.toHexString()],
        model: {
          slug: modelSlug,
        },
      };

      return [filterOptions, expectedResult];
    };

    it.each([firstSuccessCase(), secondSuccessCase()])(
      'should return the correct match stage given a filter input with both nested and non nested fields',
      (input, expectedResult) => {
        // arrange & act
        const res = filterAggregationPipelineBuilder([], input);

        // assert
        expect(res).toEqual(expectedResult);
      },
    );
  });
});
