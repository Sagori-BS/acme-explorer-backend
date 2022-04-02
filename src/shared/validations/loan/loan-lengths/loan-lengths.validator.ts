import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { _validateIds } from '../../common/identification/mongo-ids/ids.validator';
import { errorMessageBuilder } from '../../error-message-builder';

export const _validateLoanLengths = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  if (value.length === 0) {
    return false;
  }

  return _validateIds(value);
};

export const validateLoanLengths: IDatabaseValidator = {
  validator: _validateLoanLengths,
  message: errorMessageBuilder
};
