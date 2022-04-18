import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';

export const _validateTelephoneNumber = (value: string): boolean => {
  if (!value) return false;

  return validator.isMobilePhone(value);
};

export const validateTelephoneNumber: IDatabaseValidator = {
  validator: _validateTelephoneNumber,
  message: errorMessageBuilder
};

const customTelephoneNumberValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateTelephoneNumber(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateTelephoneNumberWithJoi = joi
  .string()
  .custom(customTelephoneNumberValidator, 'TelephoneNumber validator')
  .messages({
    'any.invalid': '"telephoneNumber" Invalid format'
  });
