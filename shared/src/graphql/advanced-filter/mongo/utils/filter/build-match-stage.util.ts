import { IGetMatchStageInfoInput } from '../../../interfaces/get-match-stage-info-input.interface';
import { IMatchStageInfo } from '../../../interfaces/match-stage-info.interface';
import { getGqlOperation } from '../../../utils/get-graphql-operation.util';
import { getMongoFilterOperation } from './get-mongo-filter-operation';
import { formatMongoFilterOperation } from './format-mongo-filter-operation.util';
import { MissingRequiredParametersError } from '@shared/errors/common/missing-required-parameters.error';
import { MongoFilterOperationEnum } from '../../enum/mongo-filter-operation.enum';

export const getMatchStageInfo = (
  input: IGetMatchStageInfoInput,
): IMatchStageInfo => {
  const { field, value } = input;

  if (!field) {
    throw new MissingRequiredParametersError('getMatchStageInfo');
  }

  const { fieldName, gqlOperation } = getGqlOperation(field);
  const mongoOperation = getMongoFilterOperation(gqlOperation);
  const formattedOperation = formatMongoFilterOperation({
    gqlOperation,
    mongoOperation,
    value,
    fieldName,
  });

  const key =
    mongoOperation === MongoFilterOperationEnum.$text
      ? MongoFilterOperationEnum.$text
      : fieldName;

  const matchStageInfo: IMatchStageInfo = {
    fieldName: key,
    operation: formattedOperation,
  };

  return matchStageInfo;
};

export const buildMatchStage = (matchFilter: IMatchStageInfo[]) => {
  const matchStage = {};

  for (const filter of matchFilter) {
    const { fieldName, operation } = filter;
    matchStage[fieldName] = {
      ...matchStage[fieldName],
      ...operation,
    };
  }

  return { $match: matchStage };
};
