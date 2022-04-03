import { Query } from 'mongoose';
import { filterAggregationPipelineBuilder } from './filter-aggregation-pipeline-builder.util';

export const whereQueryOptionBuilder = (
  query: Query<any, any, any, any>,
  where: Record<string, any>,
) => {
  if (!where) {
    return query;
  }
  const [filter] = filterAggregationPipelineBuilder([], where);

  if (!filter) {
    return query;
  }

  query.where(filter.$match);

  return query;
};
