import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';

export const _validateZipCode = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return value.length >= 3 && value.length <= 14;
};

export const validateZipCodeNullable: IDatabaseValidator = {
  validator: _validateZipCode,
  message: errorMessageBuilder
};
