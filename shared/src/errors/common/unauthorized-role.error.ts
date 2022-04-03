import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class UnauthorizedRoleError extends BaseError {
  readonly code = ErrorCode.UNAUTHORIZED_ROLE;

  constructor(userRoles: string[]) {
    super();
    Object.setPrototypeOf(this, UnauthorizedRoleError.prototype);

    this.message = `The user does not have permission for performing this operation. User roles: ${userRoles}`;
  }
}
