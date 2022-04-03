import { Query } from 'mongoose';

export const limitQueryOptionBuilder = (
  query: Query<any, any, any, any>,
  limit: number,
) => {
  if (!limit) {
    return query;
  }

  query.limit(limit);

  return query;
};
