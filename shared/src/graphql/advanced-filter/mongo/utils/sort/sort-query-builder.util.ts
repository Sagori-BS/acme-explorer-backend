import { InvalidSortQueryError } from '@shared/errors/filters/invalid-sort-query.error';
import { getGraphqlSortOperation } from '../../../utils/get-graphql-sort-operation.util';
import { isObject } from '../../../utils/is-object.util';
import { getMongoSortOperation } from './get-mongo-sort-operation.util';

export const sortQueryBuilder = (
  sortOptions: Record<string, any>,
): Record<string, any> => {
  if (!sortOptions) {
    return {};
  }

  const sortQuery = {};

  const sortKeys = Object.keys(sortOptions);

  let nestedFieldsCount = 0;

  for (const key of sortKeys) {
    const sortOperation = sortOptions[key];

    if (isObject(sortOperation) && !Array.isArray(sortOperation)) {
      // Manage the case where the there are nested fields
      // THe keys that have nested objects extract the nested object and convert it to
      // the correspondin pipeline and add it to the return pipeline
      const nestedFields = Object.keys(sortOperation);

      for (const nestedField of nestedFields) {
        const nestedValue = sortOperation[nestedField];

        const gqlSortOperation = getGraphqlSortOperation(nestedValue);
        const mongoSortOperation = getMongoSortOperation(gqlSortOperation);

        sortQuery[`${key}.${nestedField}`] = mongoSortOperation;

        nestedFieldsCount++;
      }
    } else {
      // The keys that are direct operations create the inmediate $match stage
      // to make the pipeline more efficient
      const gqlSortOperation = getGraphqlSortOperation(sortOperation);
      const mongoSortOperation = getMongoSortOperation(gqlSortOperation);

      sortQuery[key] = mongoSortOperation;
    }
  }

  const sortQueryKeys = Object.keys(sortQuery);

  if (nestedFieldsCount >= 1 && sortQueryKeys.length > 1) {
    throw new InvalidSortQueryError(sortQueryKeys);
  }

  return sortQuery;
};
