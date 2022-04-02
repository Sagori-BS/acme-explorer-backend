import { MissingRequiredParametersError } from '@common/common/errors/common/missing-required-parameters.error';
import { InvalidMongoSortOperarationError } from '@common/common/errors/filters/invalid-mongo-sort-operation.error';
import { GraphqlSortOperation } from '../../../enum/graphql-sort-operation.enum';
import {
  graphqlSortOperationToMongoSortOperation,
  MongoSortOperation
} from '../../enum/mongo-sort-operation.enum';

export const getMongoSortOperation = (
  gqlSortOperation: GraphqlSortOperation
): MongoSortOperation => {
  if (!gqlSortOperation) {
    throw new MissingRequiredParametersError('getMongoSortOperation');
  }

  const mongoSortOperation =
    graphqlSortOperationToMongoSortOperation[gqlSortOperation];

  if (!mongoSortOperation) {
    throw new InvalidMongoSortOperarationError(gqlSortOperation);
  }

  return mongoSortOperation;
};
