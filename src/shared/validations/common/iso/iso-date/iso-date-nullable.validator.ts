import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';

export const _validateIsoDateNullable = (value: string): boolean => {
  if (!value) {
    return true;
  }

  return validator.isISO8601(value, { strict: true });
};

export const validateIsoDateNullable: IDatabaseValidator = {
  validator: _validateIsoDateNullable,
  message: errorMessageBuilder
};

const customIsoDateValidator = (value: string, helpers: CustomHelpers) => {
  const condition = _validateIsoDateNullable(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateNullableIsoDateWithJoi = joi
  .string()
  .allow(null)
  .custom(customIsoDateValidator, 'IsoDate validator')
  .messages({ 'any.invalid': '"date" Invalid isodate' });
