import { isObject } from '../../../utils/is-object.util';
import { buildLookupStage } from './build-lookup-stage.util';
import { getCollectionName } from '../common/get-collection-name.util';

export const lookupStageBuilder = (
  pipeline: any[],
  filterOptions: Record<string, any>,
  sortOptions: Record<string, any>,
  collectionMap: Record<string, string> = {},
) => {
  let lookupStages = new Map<string, any>();

  lookupStages = _lookupStageFormatter(
    lookupStages,
    filterOptions,
    collectionMap,
  );

  lookupStages = _lookupStageFormatter(
    lookupStages,
    sortOptions,
    collectionMap,
  );

  if (lookupStages.size !== 0) {
    pipeline.push(...lookupStages.values());
  }

  return pipeline;
};

const _lookupStageFormatter = (
  lookupStages: Map<string, any>,
  filterOptions: Record<string, any>,
  collectionMap: Record<string, string> = {},
): Map<string, any> => {
  if (!filterOptions) {
    return lookupStages;
  }

  const filterKeys = Object.keys(filterOptions);

  for (const key of filterKeys) {
    const value = filterOptions[key];

    if (isObject(value) && !Array.isArray(value)) {
      const lookupStage = buildLookupStage({
        collection: getCollectionName(key, collectionMap),
        localField: key,
        outputField: key,
      });

      lookupStages.set(key, lookupStage);
    }
  }

  return lookupStages;
};
