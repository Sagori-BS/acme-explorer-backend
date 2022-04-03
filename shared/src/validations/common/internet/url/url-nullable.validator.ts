import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';

export const _validateUrlNullable = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return validator.isURL(value);
};

export const validateNullableUrl: IDatabaseValidator = {
  validator: _validateUrlNullable,
  message: errorMessageBuilder,
};
