import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import * as joi from 'joi';
import { errorMessageBuilder } from '../../../error-message-builder';
import { CustomHelpers } from 'joi';

export const _validateUrl = (value: string): boolean => {
  return validator.isURL(value);
};

export const validateUrl: IDatabaseValidator = {
  validator: _validateUrl,
  message: errorMessageBuilder
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
