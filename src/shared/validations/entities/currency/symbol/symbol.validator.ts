import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';
import * as joi from 'joi';

export const _validateSymbol = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return value.length <= 5;
};

export const validateSymbol: IDatabaseValidator = {
  validator: _validateSymbol,
  message: errorMessageBuilder
};

export const validateSymbolWithJoi = joi.string().max(5);
