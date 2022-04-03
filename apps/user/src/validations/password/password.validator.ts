import { IDatabaseValidator } from '@shared/data/interfaces/database-validator.interface';
import { invalidPasswordMessage } from './message/invalid-password-message';
import * as joi from 'joi';

export const _validatePassword = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return value.length >= 6 && value.length <= 40;
};

export const validatePassword: IDatabaseValidator = {
  validator: _validatePassword,
  message: invalidPasswordMessage,
};

export const validatePasswordWithJoi = joi
  .string()
  .min(6)
  .max(40);
