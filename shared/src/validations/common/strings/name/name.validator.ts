import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateName = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length >= 1 && value.length <= 25;
};

export const validateName: IDatabaseValidator = {
  validator: _validateName,
  message: errorMessageBuilder,
};

export const validateNameWithJoi = joi
  .string()
  .min(1)
  .max(25);
