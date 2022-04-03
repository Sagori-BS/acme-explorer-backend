import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { InvalidFieldNameFilterError } from '@shared/errors/filters/invalid-field-name-filter.error';
import { InvalidGqlFilterOperationError } from '@shared/errors/filters/invalid-gql-filter-operation.error';
import {
  GraphqlFilterOperation,
  GraphqlFilterOperationEnum,
} from '../enum/graphql-filter-operation.enum';
import { IGetGraphqlOperationResult } from '../interfaces/get-graphql-operation-result.interface';

export const getGqlOperation = (field: string): IGetGraphqlOperationResult => {
  if (!field) {
    throw new MissingRequiredParametersError('getGqlOperation');
  }

  const fieldOperation = field.split('_');

  if (fieldOperation.length >= 3) {
    throw new InvalidFieldNameFilterError(field);
  }

  if (fieldOperation.length === 2) {
    const [fieldName, gqlOperation] = fieldOperation;
    return {
      fieldName,
      gqlOperation: _getGqlOperation(gqlOperation),
    };
  }

  return {
    fieldName: fieldOperation[0],
    gqlOperation: GraphqlFilterOperationEnum.eq,
  };
};

const _getGqlOperation = (gqlOperation: string): GraphqlFilterOperation => {
  const isOp = isGqlOperation(gqlOperation);

  if (!isOp) {
    throw new InvalidGqlFilterOperationError(gqlOperation);
  }

  return <GraphqlFilterOperation>gqlOperation;
};

const isGqlOperation = (input: string) => {
  return Object.values(GraphqlFilterOperationEnum).includes(
    <GraphqlFilterOperationEnum>input,
  );
};
