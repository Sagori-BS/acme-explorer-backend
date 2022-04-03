import { GraphqlFilterOperation } from '../enum/graphql-filter-operation.enum';

export interface IGetGraphqlOperationResult {
  fieldName: string;
  gqlOperation: GraphqlFilterOperation;
}
