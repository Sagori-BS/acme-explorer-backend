import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import * as joi from 'joi';

export const _validateLoanPercentage = (value: number): boolean => {
  if (!value && value != 0) {
    return false;
  }

  return value >= 0 && value <= 100;
};

export const validateLoanPercentage: IDatabaseValidator = {
  validator: _validateLoanPercentage,
  message: errorMessageBuilder
};

export const validateLoanPercentageWithJoi = joi
  .number()
  .positive()
  .min(0)
  .max(100);
