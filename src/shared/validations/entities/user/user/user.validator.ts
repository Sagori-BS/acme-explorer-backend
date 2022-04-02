import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { isValidObjectId } from 'mongoose';
import { errorMessageBuilder } from '../../../error-message-builder';

export const _validateId = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return isValidObjectId(value);
};

export const validateUser: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder
};
