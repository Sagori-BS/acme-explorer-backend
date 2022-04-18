import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateAddressNullable = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return value.length >= 5 && value.length <= 500;
};

export const validateAddressNullable: IDatabaseValidator = {
  validator: _validateAddressNullable,
  message: errorMessageBuilder
};

export const validateNullableAddressWithJoi = joi
  .string()
  .allow(null)
  .min(5)
  .max(500);
