import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { IFormatMongooperationInput } from '../../../interfaces/format-mongo-operation-input.interface';
import { MongoFilterOperationEnum } from '../../enum/mongo-filter-operation.enum';
import { convertIdArrayToObjectIdArray } from '../common/convert-id-arry-to-object-id-array.util';
import { convertIdToObjectId } from '../common/convert-id-to-object-id.util';
import { formatMongoRegexOperation } from './format-mongo-regex-operation.util';
import { formatTextSearchOperation } from './format-text-search-operation.util';

export const formatMongoFilterOperation = (
  options: IFormatMongooperationInput,
): Record<string, any> => {
  const { gqlOperation, mongoOperation, value, fieldName } = options;

  if (!gqlOperation || !mongoOperation || !fieldName) {
    throw new MissingRequiredParametersError('formatMongoFilterOperation');
  }

  const formattedOperation = {};

  switch (mongoOperation) {
    case MongoFilterOperationEnum.$regex:
      return formatMongoRegexOperation(value, gqlOperation);
    case MongoFilterOperationEnum.$text:
      return formatTextSearchOperation(value);
    default:
      formattedOperation[mongoOperation] = isIdFilterField(fieldName)
        ? value
        : getFormattedNonIdValue(value);
      break;
  }

  return formattedOperation;
};

const getFormattedNonIdValue = (value): any => {
  return Array.isArray(value)
    ? convertIdArrayToObjectIdArray(value)
    : convertIdToObjectId(value);
};

const isIdFilterField = (fieldName: string) => {
  const splittedFieldName = fieldName.split('.');

  const fieldToCheck = splittedFieldName.pop();

  return fieldToCheck === 'id';
};
