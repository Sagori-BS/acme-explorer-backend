import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BadImplementationError } from 'src/shared/errors/common/bad-implementation.error';
import { UnauthorizedRoleError } from 'src/shared/errors/common/unauthorized-role.error';
import { GuardRequestGetter } from '../class/guard-request-getter';
import { AUTHORIZED_ROLES_KEY } from '../decorators/authorized-roles.decorator';

@Injectable()
export class RolesGuard extends GuardRequestGetter implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const authorizedRoles = this.reflector.get<string[]>(
      AUTHORIZED_ROLES_KEY,
      context.getHandler()
    );

    if (!authorizedRoles) return true;

    const request = this.getRequest(context);

    if (!request.user || !request.user.roles)
      throw new BadImplementationError();

    const isAuthorized = this.verifyRole(request.user.roles, authorizedRoles);

    if (!isAuthorized) {
      throw new UnauthorizedRoleError(request.user.roles);
    }

    return true;
  }

  private verifyRole(userRoles: string[], authorizedRoles: string[]): boolean {
    const authorizedRolesSet = new Set(authorizedRoles);

    return userRoles.some((role) => authorizedRolesSet.has(role));
  }
}
