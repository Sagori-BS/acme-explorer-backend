import { InvalidLimitInputError } from '@common/common/errors/filters/invalid-limit-input.error';

export const limitAggregationPipelineBuilder = (
  pipeline: any[],
  limit: number
) => {
  if (!limit) {
    return pipeline;
  }

  if (!Number.isInteger(limit)) {
    throw new InvalidLimitInputError(limit);
  }

  const limitStage = {
    $limit: limit
  };

  pipeline.push(limitStage);

  return pipeline;
};
