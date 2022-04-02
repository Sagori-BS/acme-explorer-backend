import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';

export const _validateLongText = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length >= 1 && value.length <= 125;
};

export const validateLongTextNullable: IDatabaseValidator = {
  validator: _validateLongText,
  message: errorMessageBuilder
};

const joiLongTextValidator = (value: any, helpers: joi.CustomHelpers) => {
  const condition = _validateLongText(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateLongTextWithJoi = joi
  .string()
  .custom(joiLongTextValidator, 'Nullable long text validator')
  .messages({ 'any.invalid': 'Text must have between 1 and 125 characters' });
