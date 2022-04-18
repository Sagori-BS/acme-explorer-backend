import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import * as joi from 'joi';

export const _validateGreaterOrEqualThan0 = (value: number): boolean => {
  if (value !== 0 && !value) {
    return false;
  }

  return value >= 0;
};

export const validateGreaterOrEqualThan0: IDatabaseValidator = {
  validator: _validateGreaterOrEqualThan0,
  message: errorMessageBuilder
};

export const validateGreaterOrEqualThan0WithJoi = joi.number().min(0);

export const validateIntegerGreaterOrEqualThan0WithJoi = joi
  .number()
  .integer()
  .min(0);
