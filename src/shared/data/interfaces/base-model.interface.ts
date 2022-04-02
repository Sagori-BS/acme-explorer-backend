import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { Model, Query, Document } from 'mongoose';

export interface BaseModel<T extends Document> extends Model<T> {
  getListingPipeline?: (filters: FilterInput) => any[];
}
