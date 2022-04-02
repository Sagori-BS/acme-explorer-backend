import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import { _validateLongText } from '../long-text/long-text.validator';
import * as joi from 'joi';

export const _validateLongTextArray = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  for (const text of value) {
    const check = _validateLongText(text);

    if (!check) {
      return check;
    }
  }

  return true;
};

export const validateLongTextArray: IDatabaseValidator = {
  validator: _validateLongTextArray,
  message: errorMessageBuilder
};

export const validateLongTextArrayWithJoi = joi.array().items(
  joi
    .string()
    .min(1)
    .max(125)
);
