import { IBaseGraphqlFilterInput } from '@shared/data/interfaces/base-graphql-filter-input.interface';
import { filterAggregationPipelineBuilder } from '@shared/graphql/advanced-filter/mongo/utils/filter/filter-aggregation-pipeline-builder.util';
import { limitAggregationPipelineBuilder } from '@shared/graphql/advanced-filter/mongo/utils/limit/limit-aggregation-pipeline-builder';
import { skipAggregationPipelineBuilder } from '@shared/graphql/advanced-filter/mongo/utils/skip/skip-aggregation-pipeline-builder';
import { sortAggregationPipelineBuilder } from '@shared/graphql/advanced-filter/mongo/utils/sort/sort-aggregation-pipeline-builder';

export const buildFilterStages = (filters: IBaseGraphqlFilterInput) => {
  const { where = {}, sort = {}, limit = 50, start = 0 } = filters;

  const [simpleMatchStage, nestedMatchStage] = filterAggregationPipelineBuilder(
    [],
    where
  );

  const [sortStage] = sortAggregationPipelineBuilder([], sort);

  const [skipStage] = skipAggregationPipelineBuilder([], start);

  const [limitStage] = limitAggregationPipelineBuilder([], limit);

  return {
    simpleMatchStage,
    nestedMatchStage,
    sortStage,
    skipStage,
    limitStage
  };
};
