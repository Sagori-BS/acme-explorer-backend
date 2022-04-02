import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateYear = (value: number): boolean => {
  if (!value) {
    return false;
  }
  return value >= 1884 && value <= new Date().getFullYear() + 2;
};

export const validateYear: IDatabaseValidator = {
  validator: _validateYear,
  message: errorMessageBuilder
};

export const validateYearWithJoi = joi
  .number()
  .integer()
  .min(1884)
  .max(new Date().getFullYear() + 2);
