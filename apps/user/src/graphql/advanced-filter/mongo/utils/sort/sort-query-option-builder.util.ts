import { Query } from 'mongoose';
import { sortQueryBuilder } from './sort-query-builder.util';

export const sortQueryOptionBuilder = (
  query: Query<any, any, any, any>,
  sortOptions: Record<string, any>,
): Query<any, any, any, any> => {
  if (!sortOptions) {
    return query;
  }

  const sortQuery = sortQueryBuilder(sortOptions);

  query.sort(sortQuery);

  return query;
};
