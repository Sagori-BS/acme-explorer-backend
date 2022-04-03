import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ExpiredTokenError } from '@shared/errors/common/expired-token.error';
import { MalformedTokenError } from '@shared/errors/common/malformed-token.error';
import { GuardRequestGetter } from '../class/guard-request-getter';

@Injectable()
export abstract class JwtAuthGuardAbstract extends AuthGuard('jwt') {
  private requestGetter: GuardRequestGetter;

  constructor(private reflector: Reflector) {
    super();

    this.requestGetter = new GuardRequestGetter();
  }

  handleRequest(err, user, info, context) {
    if (info) {
      if (info instanceof TokenExpiredError) {
        throw new ExpiredTokenError();
      } else if (
        info instanceof JsonWebTokenError ||
        info.message === 'No auth token'
      ) {
        throw new MalformedTokenError();
      }
    }

    return super.handleRequest(err, user, info, context);
  }

  getRequest(context: ExecutionContext) {
    return this.requestGetter.getRequest(context);
  }
}
