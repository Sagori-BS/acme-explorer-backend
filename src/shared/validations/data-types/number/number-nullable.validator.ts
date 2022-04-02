import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';

export const _validatePositiveNullableNumber = (value: number): boolean => {
  if (value === null) {
    return true;
  }

  if (value === undefined) {
    return false;
  }

  return value > 0;
};

export const validatePositiveNullableNumber: IDatabaseValidator = {
  validator: _validatePositiveNullableNumber,
  message: errorMessageBuilder
};
