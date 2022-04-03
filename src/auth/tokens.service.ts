import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { User } from '../user/database/user.entity';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthenticationType } from './graphql/types/authentication.type';
import { UserService } from '../user/user.service';
import { JwtPayload } from '@common/common/auth/interfaces/jwt-payload.interface';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RefreshToken } from '../refresh-token/database/refresh-token.entity';
import { RefreshAccessTokenInput } from './graphql/inputs/refresh-access-token.input';
import { RefreshTokenPayload } from '@common/common/auth/interfaces/refresh-token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from '../../config/env-key.enum';
import { CommonEnvKey } from '@common/common/config/common-env-key.enum';
import { RevokedTokenError } from './errors/revoked-token.error';
import { RevokeRefreshTokenType } from '../refresh-token/graphql/types/revoke-refresh-token.type';
import { RevokeRefreshTokenInput } from './graphql/inputs/revoke-refresh-token.input';
import { MalformedTokenError } from '@common/common/errors/common/malformed-token.error';
import { ExpiredTokenError } from '@common/common/errors/common/expired-token.error';
import {
  DEFAULT_LANGUAGE_OPTIONS_DTO,
  RequestLanguageOptionsDto
} from '@common/common/language/dtos/request-language-options.dto';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private userService: UserService,
    private readonly configService: ConfigService
  ) {}

  async signAccessToken(user: User) {
    const { id, email, roles } = user;

    const parsedRoles = roles.map(role => role.slug);
    const payload: JwtPayload = { id, email, roles: parsedRoles };

    const signOptions: JwtSignOptions = {
      expiresIn: this.configService.get(CommonEnvKey.ACCESS_TOKEN_EXPIRES_IN),
      secret: this.configService.get(CommonEnvKey.ACCESS_TOKEN_SECRET)
    };
    const accessToken = this.jwtService.sign(payload, signOptions);

    return accessToken;
  }

  async createAndSignRefreshToken(user: User) {
    const refreshToken = await this.refreshTokenService.createRefreshToken({
      user: user.id
    });

    const payload: RefreshTokenPayload = { user: refreshToken.user };

    const signOptions: JwtSignOptions = {
      jwtid: refreshToken.id,
      //TODO: Use refresh token expiresAt date for more accuracy
      expiresIn: this.configService.get(EnvKey.REFRESH_TOKEN_EXPIRES_IN),
      secret: this.configService.get(EnvKey.REFRESH_TOKEN_SECRET)
    };

    const jwt = this.jwtService.sign(payload, signOptions);

    return jwt;
  }

  async refreshAccessToken(
    refreshAccessTokenInput: RefreshAccessTokenInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<AuthenticationType> {
    const { user } = await this.resolveRefreshToken(
      refreshAccessTokenInput.refreshToken,
      requestLanguageOptionsDto
    );

    const refreshToken = await this.createAndSignRefreshToken(user);
    const accessToken = await this.signAccessToken(user);

    return { user, accessToken, refreshToken };
  }

  public async revokeRefreshToken(
    revokeRefreshTokenInput: RevokeRefreshTokenInput
  ): Promise<RevokeRefreshTokenType> {
    return this.refreshTokenService.revokeRefreshToken(revokeRefreshTokenInput);
  }

  private async resolveRefreshToken(
    encodedRefreshToken: string,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<{ user: User; refreshToken: RefreshToken }> {
    const payload = await this.decodeAndVerifyRefreshToken(encodedRefreshToken);
    const refreshToken = await this.getRefreshTokenFromPayload(payload);

    if (refreshToken.isRevoked) {
      throw new RevokedTokenError();
    }

    const user = await this.validateUserFromPayload(
      payload,
      requestLanguageOptionsDto
    );

    return { user, refreshToken };
  }

  private async decodeAndVerifyRefreshToken(
    refreshToken: string
  ): Promise<RefreshTokenPayload> {
    try {
      const verifyOptions: JwtVerifyOptions = {
        secret: this.configService.get(EnvKey.REFRESH_TOKEN_SECRET)
      };

      const payload = this.jwtService.verify(refreshToken, verifyOptions);

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError();
      } else {
        throw new MalformedTokenError();
      }
    }
  }

  private async getRefreshTokenFromPayload(
    payload: RefreshTokenPayload
  ): Promise<RefreshToken> {
    const refreshTokenId = payload.jti;

    if (!refreshTokenId) {
      throw new MalformedTokenError();
    }

    return this.refreshTokenService.getRefreshTokenById({ id: refreshTokenId });
  }

  private async validateUserFromPayload(
    payload: RefreshTokenPayload,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<User> {
    const userId = payload.user;

    if (!userId) {
      throw new MalformedTokenError();
    }

    const user = await this.userService.getOneEntity(
      { id: userId },
      requestLanguageOptionsDto
    );

    return user;
  }
}
