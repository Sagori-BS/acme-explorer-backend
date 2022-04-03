import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';

export const _validateTelephoneNumberNullable = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return validator.isMobilePhone(value);
};

export const validateTelephoneNumberNullable: IDatabaseValidator = {
  validator: _validateTelephoneNumberNullable,
  message: errorMessageBuilder
};
