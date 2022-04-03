import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public-resource.decorator';
import { JwtAuthGuardAbstract } from './jwt-auth.abstract-guard';

@Injectable()
export class JwtAuthSoftGuard extends JwtAuthGuardAbstract {
  constructor(private _reflector: Reflector) {
    super(_reflector);
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = this.getRequest(context);

    if (!isPublic || !request.headers.authorization) return true;

    return super.canActivate(context);
  }
}
