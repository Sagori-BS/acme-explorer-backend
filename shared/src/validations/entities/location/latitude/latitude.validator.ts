import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';

export const _validateLatitude = (value: number): boolean => {
  if (!value && value !== 0) {
    return false;
  }
  return value >= -90 && value <= 90;
};

export const validateLatitude: IDatabaseValidator = {
  validator: _validateLatitude,
  message: errorMessageBuilder
};

export const validateLatitudeWithJoi = joi
  .number()
  .min(-90)
  .max(90);
