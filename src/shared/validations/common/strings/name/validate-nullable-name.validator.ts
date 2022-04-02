import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import { _validateName } from './name.validator';

export const _validateNullableName = (value: string): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  return _validateName(value);
};

export const validateNullableName: IDatabaseValidator = {
  validator: _validateNullableName,
  message: errorMessageBuilder
};
