import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';

export const _validateName = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return value.length >= 1 && value.length <= 50;
};

export const validateNameNullable: IDatabaseValidator = {
  validator: _validateName,
  message: errorMessageBuilder
};
