import { CountryCode } from '@common/common/data/enums/country-code.enum';
import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';
import validator from 'validator';

const handleCountryValidation = () => {
  const countryCode = process.env.COUNTRY_CODE;

  switch (countryCode) {
    case CountryCode.DOM:
      return 11;
    default:
      return 11;
  }
};

export const _validateDocumentId = (value: string): boolean => {
  const length = handleCountryValidation();

  if (value === null) return true;
  if (!value) return false;

  return validator.isNumeric(value) && value.length === length;
};

export const validateDocumentId: IDatabaseValidator = {
  validator: _validateDocumentId,
  message: errorMessageBuilder
};

const customDocumentIdValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateDocumentId(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const invalidDocumentIdErrorMessage = 'Invalid Document ID';

//TODO: Create more descriptive error messages. i.e: DocumentId must be 11 characters long.
export const validateDocumentIdWithJoi = joi
  .string()
  .custom(customDocumentIdValidator, 'DocumentId validator')
  .messages({ 'any.invalid': invalidDocumentIdErrorMessage });
