import { Query } from 'mongoose';

export const skipQueryOptionBuilder = (
  query: Query<any, any, any, any>,
  skip: number,
) => {
  if (!skip) {
    return query;
  }

  query.skip(skip);

  return query;
};
