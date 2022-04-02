import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '@common/common/validations/error-message-builder';
import * as joi from 'joi';

const hexCodeRegex = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'); // 3 or 6 chars long

export const _validateHexCode = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return hexCodeRegex.test(value);
};

export const validateHexCode: IDatabaseValidator = {
  validator: _validateHexCode,
  message: errorMessageBuilder
};

export const validateHexCodeWithJoi = joi
  .string()
  .regex(hexCodeRegex)
  .message('invalid "hexCode"');
