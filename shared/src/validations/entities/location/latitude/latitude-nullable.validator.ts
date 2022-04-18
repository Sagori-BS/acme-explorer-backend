import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@shared/validations/error-message-builder';
import * as joi from 'joi';

export const _validateLatitudeNullable = (value: number): boolean => {
  if (!value) {
    return true;
  }
  return value >= -90 && value <= 90;
};

export const validateLatitudeNullable: IDatabaseValidator = {
  validator: _validateLatitudeNullable,
  message: errorMessageBuilder
};

export const validateNullableLatitudeWithJoi = joi
  .number()
  .allow(null)
  .min(-90)
  .max(90);
