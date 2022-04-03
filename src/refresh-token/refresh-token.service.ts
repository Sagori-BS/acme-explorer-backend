import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken } from './database/refresh-token.entity';
import { CreateRefreshTokenInput } from './graphql/inputs/create-refresh-token.input';
import { RevokeRefreshTokenType } from './graphql/types/revoke-refresh-token.type';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from '../../config/env-key.enum';
import * as ms from 'ms';
import { RevokeRefreshTokenInput } from '../auth/graphql/inputs/revoke-refresh-token.input';

@Injectable()
export class RefreshTokenService {
  constructor(
    private refreshTokenRepository: RefreshTokenRepository,
    private readonly configService: ConfigService
  ) {}

  public async getRefreshTokenById(
    getRefreshTokenByIdInput: GetEntityByIdInput
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.getOneEntity(getRefreshTokenByIdInput);
  }

  public async createRefreshToken(
    createRefreshTokenInput: CreateRefreshTokenInput
  ): Promise<RefreshToken> {
    const expirationTimeFrame = this.configService.get(
      EnvKey.REFRESH_TOKEN_EXPIRES_IN
    );

    const expiresInMilliseconds: any = ms(expirationTimeFrame);

    const expiresIn = new Date();
    expiresIn.setTime(expiresIn.getTime() + expiresInMilliseconds);

    createRefreshTokenInput.expiresIn = expiresIn.toISOString();

    return this.refreshTokenRepository.createEntity(createRefreshTokenInput);
  }

  public async revokeRefreshToken(
    revokeRefreshTokenInput: RevokeRefreshTokenInput
  ): Promise<RevokeRefreshTokenType> {
    return this.refreshTokenRepository.revokeRefreshToken(
      revokeRefreshTokenInput
    );
  }
}
