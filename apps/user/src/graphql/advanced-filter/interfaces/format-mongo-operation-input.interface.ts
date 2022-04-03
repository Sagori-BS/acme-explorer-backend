import { GraphqlFilterOperation } from '../enum/graphql-filter-operation.enum';
import { MongoOperation } from '../mongo/enum/mongo-filter-operation.enum';

export interface IFormatMongooperationInput {
  mongoOperation: MongoOperation;
  gqlOperation: GraphqlFilterOperation;
  fieldName: string;
  value: any;
}
