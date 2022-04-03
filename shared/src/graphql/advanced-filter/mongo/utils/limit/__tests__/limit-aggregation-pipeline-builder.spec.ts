import { InvalidLimitInputError } from '@shared/errors/filters/invalid-limit-input.error';
import { limitAggregationPipelineBuilder } from '../limit-aggregation-pipeline-builder';

describe('limitAggregationPipelineBuilder', () => {
  it('should throw an error if given null', () => {
    // act
    const res = limitAggregationPipelineBuilder([], null);

    // assert
    expect(res).toEqual([]);
  });

  it('should throw an error if given undefined', () => {
    // act
    const res = limitAggregationPipelineBuilder([], undefined);

    // assert
    expect(res).toEqual([]);
  });

  it.each([[10.7], [11.9]])('should throw an error if given a float', input => {
    // arrange & act & assert
    expect(() => limitAggregationPipelineBuilder([], input)).toThrow(
      InvalidLimitInputError,
    );
  });

  it.each([[10], [15], [90]])(
    'should return the corresponding limit stage',
    input => {
      // arrange
      const expectedResult = {
        $limit: input,
      };

      // act
      const [res] = limitAggregationPipelineBuilder([], input);

      // assert
      expect(res).toEqual(expectedResult);
    },
  );
});
