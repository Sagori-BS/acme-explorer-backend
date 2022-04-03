import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { IErrorMessageBuilderProps } from '@common/common/data/interfaces/error-message-builder.interface';
import * as joi from 'joi';
import { CustomHelpers } from 'joi';

export const _validateUserRole = (value: string): boolean => {
  const userRoles: Set<any> = new Set(Object.values(UserRoles));

  if (!value || !userRoles.has(value.toLowerCase())) {
    return false;
  }

  return true;
};

export const validateUserRole: IDatabaseValidator = {
  validator: _validateUserRole,
  message: (props: IErrorMessageBuilderProps): string => {
    return `Invalid role: ${props.value}`;
  }
};

const customUserRoleValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateUserRole(value);
  if (!condition) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const validateUserRoleWithJoi = joi
  .string()
  .custom(customUserRoleValidator, 'UserRole validator')
  .messages({ 'any.invalid': 'Invalid user role' });
