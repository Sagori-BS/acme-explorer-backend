import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import * as joi from 'joi';

export const _validatePositiveNumber = (value: number): boolean => {
  if (!value) {
    return false;
  }

  return value > 0;
};

export const validatePositiveNumber: IDatabaseValidator = {
  validator: _validatePositiveNumber,
  message: errorMessageBuilder
};

export const validatePositiveNumberWithJoi = joi.number().positive();
