import { InternalServerError } from '@shared/errors/common/internal-server.error';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { GraphqlFilterOperation } from '../../../enum/graphql-filter-operation.enum';
import {
  graphqlOperationToMongoOperation,
  MongoOperation,
} from '../../enum/mongo-filter-operation.enum';

export const getMongoFilterOperation = (
  gqlOperation: GraphqlFilterOperation,
): MongoOperation => {
  if (!gqlOperation) {
    throw new MissingRequiredParametersError('getMongoOperation');
  }

  const mongoOperation = graphqlOperationToMongoOperation[gqlOperation];

  if (!mongoOperation) {
    throw new InternalServerError();
  }

  return mongoOperation;
};
