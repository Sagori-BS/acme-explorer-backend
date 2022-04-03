import { FilterInput } from '../../inputs/graphql-filter.input';
import { filterAggregationPipelineBuilder } from './utils/filter/filter-aggregation-pipeline-builder.util';
import { limitAggregationPipelineBuilder } from './utils/limit/limit-aggregation-pipeline-builder';
import { lookupStageBuilder } from './utils/lookup/lookup-stage-builder.util';
import { skipAggregationPipelineBuilder } from './utils/skip/skip-aggregation-pipeline-builder';
import { sortAggregationPipelineBuilder } from './utils/sort/sort-aggregation-pipeline-builder';

export const aggregationPipelineBuilder = (
  filterInput: FilterInput = {},
  collectionMap: Record<string, string> = {},
): any[] => {
  const { limit, sort, start = 0, where } = filterInput;

  let pipeline = [];

  const [simpleMatchStage, nestedMatchStage] = filterAggregationPipelineBuilder(
    [],
    where,
  );

  if (simpleMatchStage) {
    pipeline.push(simpleMatchStage);
  }

  pipeline = lookupStageBuilder(pipeline, where, sort, collectionMap);

  if (nestedMatchStage) {
    pipeline.push(nestedMatchStage);
  }

  pipeline = sortAggregationPipelineBuilder(pipeline, sort);

  pipeline = skipAggregationPipelineBuilder(pipeline, start);

  pipeline = limitAggregationPipelineBuilder(pipeline, limit);

  return pipeline;
};
