import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { CustomHelpers } from 'joi';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateUrls = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  for (const v of value) {
    const check: boolean = validator.isURL(v);

    if (!check) {
      return check;
    }
  }

  return true;
};

export const validateUrls: IDatabaseValidator = {
  validator: _validateUrls,
  message: errorMessageBuilder
};

const customUrlsValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateUrls(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateUrlsWithJoi = joi
  .array()
  .custom(customUrlsValidator, 'Url validator')
  .messages({ 'any.invalid': 'Invalid url' });

export const validateUrlArrayWithJoi = (fieldName = 'field') =>
  joi
    .array()
    .custom(customUrlsValidator, 'Url validator')
    .messages({ 'any.invalid': `${fieldName}: Invalid array of urls` });
