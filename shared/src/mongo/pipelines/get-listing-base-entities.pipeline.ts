import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { buildFilterStages } from '../utils/build-filter-stages.util';

export const buildGetListingBaseEntitiesPipeline = (options: {
  filters: FilterInput;
  entity?: string;
  fieldsToBeTranslated?: string[];
  getListingLookupStages?: any[];
}) => {
  const { filters, entity = 'data', getListingLookupStages = [] } = options;

  const {
    limitStage,
    skipStage,
    sortStage,
    simpleMatchStage,
    nestedMatchStage
  } = buildFilterStages(filters);

  const entities = {};
  const entityFacet = {};

  entities[`${entity}`] = `$${entity}`;
  entityFacet[`${entity}`] = [skipStage, limitStage];

  const pipeline: any[] = [
    {
      $match: {
        deleted: false
      }
    }
  ];

  if (simpleMatchStage) {
    pipeline.push(simpleMatchStage);
  }

  pipeline.push(...getListingLookupStages);

  if (nestedMatchStage) {
    pipeline.push(nestedMatchStage);
  }

  if (sortStage) {
    pipeline.push(sortStage);
  }

  pipeline.push(
    ...[
      {
        $facet: {
          count: [
            {
              $count: 'count'
            }
          ],
          ...entityFacet
        }
      },
      {
        $project: {
          count: {
            $ifNull: [
              {
                $first: '$count.count'
              },
              0
            ]
          },
          ...entities
        }
      }
    ]
  );

  return pipeline;
};
