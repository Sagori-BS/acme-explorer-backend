import { Query } from 'mongoose';
import { FilterInput } from '../../inputs/graphql-filter.input';
import { whereQueryOptionBuilder } from './utils/filter/where-query-option-builder.util';
import { limitQueryOptionBuilder } from './utils/limit/limit-query-option-builder.util';
import { skipQueryOptionBuilder } from './utils/skip/skip-query-option-builder.util';
import { sortQueryOptionBuilder } from './utils/sort/sort-query-option-builder.util';

export const mongooseQueryBuilder = (
  query: Query<any, any, any, any>,
  filterInput: FilterInput,
): Query<any, any, any, any> => {
  const { limit, sort, start, where } = filterInput || {};

  query = sortQueryOptionBuilder(query, sort);

  query = skipQueryOptionBuilder(query, start);

  query = limitQueryOptionBuilder(query, limit);

  query = whereQueryOptionBuilder(query, where);

  return query;
};
