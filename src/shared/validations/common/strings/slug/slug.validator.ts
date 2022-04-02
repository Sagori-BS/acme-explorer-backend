import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { isSlug } from '../../../functions/is-slug';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateSlug = (value: string): boolean => {
  if (!value) {
    return false;
  }

  if (value.length <= 2) {
    return isSlug(value);
  }

  return validator.isSlug(value);
};

export const validateSlug: IDatabaseValidator = {
  validator: _validateSlug,
  message: errorMessageBuilder
};

const joiSlugValidator = (value: any, helpers: joi.CustomHelpers) => {
  if (!_validateSlug(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateSlugWithJoi = joi
  .string()
  .custom(joiSlugValidator, 'slug validator')
  .messages({ 'any.invalid': 'Invalid slug' });
