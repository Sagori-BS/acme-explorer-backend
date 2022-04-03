import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { IErrorMessageBuilderProps } from '@common/common/data/interfaces/error-message-builder.interface';
import * as joi from 'joi';

export const _validateUserRoles = (value: string[]): boolean => {
  const userRoles: Set<any> = new Set(Object.values(UserRoles));

  for (const role of value) {
    if (!userRoles.has(role)) {
      return false;
    }
  }

  return true;
};

export const validateUserRoles: IDatabaseValidator = {
  validator: _validateUserRoles,
  message: (props: IErrorMessageBuilderProps): string => {
    return `Invalid role: ${props.value}`;
  }
};

export const validateUserRolesWithJoi = joi
  .array()
  .min(1)
  .items(joi.string().valid(...Object.values(UserRoles)));
