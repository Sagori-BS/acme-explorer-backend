import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';
import { Currency } from '@common/common/graphql/enums/currency.enum';

export const _validateCode = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return value.length === 3;
};

export const validateCode: IDatabaseValidator = {
  validator: _validateCode,
  message: errorMessageBuilder
};

export const validateCurrencyWithJoi = joi
  .string()
  .valid(...Object.values(Currency));
