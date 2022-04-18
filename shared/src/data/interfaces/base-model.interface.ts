import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { Model, Query, Document } from 'mongoose';

export interface BaseModel<T extends Document> extends Model<T> {
  buildProjection?: (
    query: Query<any, any, any, any>
  ) => Query<any, any, any, any>;

  getListingPipeline?: (filters: FilterInput) => any[];
}
