import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../user/database/user.entity';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { CommonEnvKey } from '@shared/config/common-env-key.enum';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signAccessToken(user: User) {
    const { id, email, role } = user;

    const payload: JwtPayload = { id, email, role };

    const signOptions: JwtSignOptions = {
      expiresIn: this.configService.get(CommonEnvKey.ACCESS_TOKEN_EXPIRES_IN),
      secret: this.configService.get(CommonEnvKey.ACCESS_TOKEN_SECRET),
    };

    const accessToken = this.jwtService.sign(payload, signOptions);

    return accessToken;
  }
}
