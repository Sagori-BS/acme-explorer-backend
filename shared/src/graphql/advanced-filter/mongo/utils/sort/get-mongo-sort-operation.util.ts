import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { InvalidMongoSortOperarationError } from '@shared/errors/filters/invalid-mongo-sort-operation.error';
import { GraphqlSortOperation } from '@user/graphql/advanced-filter/enum/graphql-sort-operation.enum';
import {
  graphqlSortOperationToMongoSortOperation,
  MongoSortOperation,
} from '../../enum/mongo-sort-operation.enum';

export const getMongoSortOperation = (
  gqlSortOperation: GraphqlSortOperation,
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
