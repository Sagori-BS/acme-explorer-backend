import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import validator from 'validator';
import * as joi from 'joi';

export const _validateEmail = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isEmail(value);
};

export const validateEmail: IDatabaseValidator = {
  validator: _validateEmail,
  message: errorMessageBuilder
};

export const validateEmailWithJoi = joi.string().email();
