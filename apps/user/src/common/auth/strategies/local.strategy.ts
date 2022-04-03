import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/database/user.entity';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const isValidCredential = await this.authService.validateCredential(
      email,
      password,
    );

    if (isValidCredential) {
      const user = await this.userService.getOneEntity({ email });

      return user;
    }

    throw new InvalidCredentialsError();
  }
}
