import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../error-message-builder';
import { isValidObjectId, Types } from 'mongoose';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';

export const _validateId = (value: any): boolean => {
  try {
    if (!value) {
      return false;
    }

    const isMongooseValidId = isValidObjectId(value);

    if (!isMongooseValidId) {
      return false;
    }

    if (value._id && isValidObjectId(value._id)) {
      return true;
    }

    new Types.ObjectId(value);

    if (value.toString().length < 24) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const validateId: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder,
};

//Example custom validator
const customIdValidator = (value: any, helpers: CustomHelpers) => {
  const condiction = _validateId(value);
  if (!condiction) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateIdWithJoi = joi
  .string()
  .custom(customIdValidator, 'ObjectId validator')
  .messages({ 'any.invalid': '"id" Invalid ObjectId' });
