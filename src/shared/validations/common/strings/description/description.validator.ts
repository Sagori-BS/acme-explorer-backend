import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateDescription = (value: string): boolean => {
  return value.length >= 5 && value.length <= 500;
};

export const validateDescription: IDatabaseValidator = {
  validator: _validateDescription,
  message: errorMessageBuilder
};

export const validateDescriptionWithJoi = joi
  .string()
  .min(5)
  .max(500);
