import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';

export const _validateLongitude = (value: number): boolean => {
  if (!value && value !== 0) {
    return false;
  }
  return value >= -180 && value <= 180;
};

export const validateLongitude: IDatabaseValidator = {
  validator: _validateLongitude,
  message: errorMessageBuilder
};

export const validateLongitudeWithJoi = joi
  .number()
  .min(-180)
  .max(180);
