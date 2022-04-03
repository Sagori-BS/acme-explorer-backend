import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@shared/validations/error-message-builder';
import { isValidObjectId } from 'mongoose';

export const _validateId = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return isValidObjectId(value);
};

export const validateUser: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder,
};
