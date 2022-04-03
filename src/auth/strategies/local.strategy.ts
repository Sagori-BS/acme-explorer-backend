import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/database/user.entity';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';
import { _getRequestLanguageCode } from '@common/common/language/decorators/get-request-language.decorator';
import { RequestLanguageOptionsDto } from '@common/common/language/dtos/request-language-options.dto';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    request: Request,
    email: string,
    password: string
  ): Promise<User> {
    const isValidCredential = await this.authService.validateCredential(
      email,
      password
    );

    if (isValidCredential) {
      const requestLanguageOptionsDto = this.getRequestLanguageCode(request);
      return await this.userService.getOneEntity(
        { email },
        requestLanguageOptionsDto
      );
    }

    throw new InvalidCredentialsError();
  }

  private getRequestLanguageCode(request: any): RequestLanguageOptionsDto {
    const { headers } = request;

    return { language: _getRequestLanguageCode(headers) };
  }
}
