import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import validator from 'validator';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';
import { errorMessageBuilder } from '@shared/validations/error-message-builder';

export const _validateUrl = (value: string): boolean => {
  return validator.isURL(value);
};

export const validateUrl: IDatabaseValidator = {
  validator: _validateUrl,
  message: errorMessageBuilder,
};

const customUrlValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateUrl(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateUrlWithJoiErrorMesssage = 'Invalid url';

export const validateUrlWithJoi = joi
  .custom(customUrlValidator, 'Url validator')
  .messages({ 'any.invalid': validateUrlWithJoiErrorMesssage });
