import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';

export const _validateIsoDate = (value: string): boolean => {
  return validator.isISO8601(value, { strict: true });
};

export const validateIsoDate: IDatabaseValidator = {
  validator: _validateIsoDate,
  message: errorMessageBuilder
};

const customIsoDateValidator = (value: string, helpers: CustomHelpers) => {
  const condition = _validateIsoDate(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateIsoDateWithJoi = joi
  .string()
  .custom(customIsoDateValidator, 'IsoDate validator')
  .messages({ 'any.invalid': '"date" Invalid isodate' });
