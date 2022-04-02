import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import { _validateGreaterOrEqualThan0 } from './greater-or-equal-than-zero.validator';

export const _validateNullableGreaterOrEqualThanZero = (
  value: number
): boolean => {
  if (!value) {
    return true;
  }

  return _validateGreaterOrEqualThan0(value);
};

export const validateNulllableGreaterOrEqualThan0: IDatabaseValidator = {
  validator: _validateNullableGreaterOrEqualThanZero,
  message: errorMessageBuilder
};
