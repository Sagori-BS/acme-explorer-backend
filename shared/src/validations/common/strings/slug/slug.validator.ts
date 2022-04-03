import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import validator from 'validator';
import { isSlug } from '../../../functions/is-slug';
import { errorMessageBuilder } from '../../../error-message-builder';

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
  message: errorMessageBuilder,
};
