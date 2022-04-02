import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateUuid = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isUUID(value);
};

export const validateUuid: IDatabaseValidator = {
  validator: _validateUuid,
  message: errorMessageBuilder
};

const joiUuidValidator = (value: any, helpers: joi.CustomHelpers) => {
  const condition = _validateUuid(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateUuidWithJoi = (fieldName = 'field') =>
  joi
    .string()
    .custom(joiUuidValidator, 'Uuid validator')
    .messages({
      'any.invalid': `${fieldName}: received value is not a uuid`
    });
