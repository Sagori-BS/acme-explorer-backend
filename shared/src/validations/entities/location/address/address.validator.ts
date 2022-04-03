import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateAddress = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length >= 5 && value.length <= 500;
};

export const validateAddress: IDatabaseValidator = {
  validator: _validateAddress,
  message: errorMessageBuilder
};

export const validateAddressWithJoi = joi
  .string()
  .min(5)
  .max(500);
