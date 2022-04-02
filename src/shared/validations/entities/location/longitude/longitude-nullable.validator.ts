import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';

export const _validateLongitudeNullable = (value: number): boolean => {
  if (!value) {
    return true;
  }
  return value >= -180 && value <= 180;
};

export const validateLongitudeNullable: IDatabaseValidator = {
  validator: _validateLongitudeNullable,
  message: errorMessageBuilder
};

export const validateNullableLongitudeWithJoi = joi
  .number()
  .allow(null)
  .min(-180)
  .max(180);
