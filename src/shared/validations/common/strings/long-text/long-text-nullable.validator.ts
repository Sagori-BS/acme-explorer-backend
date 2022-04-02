import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import { _validateLongText } from './long-text.validator';

export const _validateNullableLongText = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return _validateLongText(value);
};

export const validateLongTextNullable: IDatabaseValidator = {
  validator: _validateNullableLongText,
  message: errorMessageBuilder
};
