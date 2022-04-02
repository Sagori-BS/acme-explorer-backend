import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class UnauthorizedRoleError extends BaseError {
  readonly code = ErrorCode.UNAUTHORIZED_ROLE;

  constructor(userRoles: string[]) {
    super();
    Object.setPrototypeOf(this, UnauthorizedRoleError.prototype);

    this.message = `The user does not have permission for performing this operation. User roles: ${userRoles}`;
  }
}
