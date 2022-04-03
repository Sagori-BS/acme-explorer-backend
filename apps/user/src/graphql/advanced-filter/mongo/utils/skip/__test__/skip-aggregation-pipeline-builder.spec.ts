import { InvalidStartInputError } from '@shared/errors/filters/invalid-start-input.error';
import { skipAggregationPipelineBuilder } from '../skip-aggregation-pipeline-builder';

describe('SkipAggregationPipelineBuilder', () => {
  it('should throw an error if given null', () => {
    // arrange & act & assert
    expect(() => skipAggregationPipelineBuilder([], null)).toThrow(
      InvalidStartInputError,
    );
  });

  it('should throw an error if given undefined', () => {
    // arrange & act & assert
    expect(() => skipAggregationPipelineBuilder([], undefined)).toThrow(
      InvalidStartInputError,
    );
  });

  it.each([[10.7], [11.9]])('should throw an error if given a float', input => {
    // arrange & act
    expect(() => skipAggregationPipelineBuilder([], input)).toThrow(
      InvalidStartInputError,
    );
    // assert
  });

  it.each([[10], [15], [90]])(
    'should return the corresponding limit stage',
    input => {
      // arrange
      const expectedResult = {
        $skip: input,
      };

      // act
      const [res] = skipAggregationPipelineBuilder([], input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
