import { isObject } from '../../../utils/is-object.util';
import { buildMatchStage, getMatchStageInfo } from './build-match-stage.util';

export const filterAggregationPipelineBuilder = (
  pipeline: any[],
  filterOptions: Record<string, any>,
): any[] => {
  if (!filterOptions) {
    return pipeline;
  }

  const simpleMatchStage = [];

  const advancedMatchStage = [];

  // get the keys
  const filterKeys = Object.keys(filterOptions);

  // verify if the keys are direct operations or nested fields by evaluating the values
  for (const key of filterKeys) {
    const value = filterOptions[key];

    if (isObject(value) && !Array.isArray(value)) {
      // Manage the case where the there are nested fields
      // THe keys that have nested objects extract the nested object and convert it to
      // the correspondin pipeline and add it to the return pipeline
      const nestedFields = Object.keys(value);

      for (const nestedField of nestedFields) {
        const nestedValue = value[nestedField];

        const matchStage = getMatchStageInfo({
          field: `${key}.${nestedField}`,
          value: nestedValue,
        });

        advancedMatchStage.push(matchStage);
      }
    } else {
      // The keys that are direct operations create the inmediate $match stage
      // to make the pipeline more efficient
      const matchStageInfo = getMatchStageInfo({
        field: key,
        value,
      });

      simpleMatchStage.push(matchStageInfo);
    }
  }

  if (simpleMatchStage.length !== 0) {
    pipeline.push(buildMatchStage(simpleMatchStage));
  }

  if (advancedMatchStage.length !== 0) {
    pipeline.push(buildMatchStage(advancedMatchStage));
  }

  return pipeline;
};
