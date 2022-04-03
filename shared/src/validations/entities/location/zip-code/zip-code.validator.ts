import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@shared/validations/error-message-builder';
import * as joi from 'joi';

export const _validateZipCode = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return value.length >= 3 && value.length <= 14;
};

export const validateZipCode: IDatabaseValidator = {
  validator: _validateZipCode,
  message: errorMessageBuilder
};

export const validateZipCodeWithJoi = joi
  .string()
  .min(3)
  .max(14);
