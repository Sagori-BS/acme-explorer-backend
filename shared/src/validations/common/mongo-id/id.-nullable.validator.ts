import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import { _validateId } from './id.validator';

export const _validateIdNullable = (value: string): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  return _validateId(value);
};

export const validateIdNullable: IDatabaseValidator = {
  validator: _validateIdNullable,
  message: errorMessageBuilder,
};
