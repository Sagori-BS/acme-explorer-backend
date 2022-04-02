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

export const _validateDrivingLicense = (value: string): boolean => {
  const length = handleCountryValidation();

  if (value === null) return true;
  if (!value) return false;

  return validator.isNumeric(value) && value.length === length;
};

export const validateDrivingLicense: IDatabaseValidator = {
  validator: _validateDrivingLicense,
  message: errorMessageBuilder
};

const customDrivingLicenseValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateDrivingLicense(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

//TODO: Create more descriptive error messages. i.e: DrivingLicense must be 10 characters long.
export const validateDrivingLicenseWithJoi = joi
  .string()
  .custom(customDrivingLicenseValidator, 'DrivingLicense validator')
  .messages({ 'any.invalid': 'Invalid Driving License' });
