import { sortQueryBuilder } from './sort-query-builder.util';

export const sortAggregationPipelineBuilder = (
  pipeline: any[],
  sortOptions: Record<string, any>,
): any[] => {
  if (!sortOptions) {
    return pipeline;
  }

  const sortQuery = sortQueryBuilder(sortOptions);

  if (Object.values(sortQuery).length === 0) {
    return pipeline;
  }

  const sortStage = {
    $sort: sortQuery,
  };

  pipeline.push(sortStage);

  return pipeline;
};
