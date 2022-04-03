import { InvalidStartInputError } from '@shared/errors/filters/invalid-start-input.error';

export const skipAggregationPipelineBuilder = (
  pipeline: any[],
  skip: number,
) => {
  if (!Number.isInteger(skip)) {
    throw new InvalidStartInputError(skip);
  }

  const skipStage = {
    $skip: skip,
  };

  pipeline.push(skipStage);

  return pipeline;
};
