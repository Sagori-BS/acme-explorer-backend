import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken } from './database/refresh-token.entity';
import { ClientSession, Model } from 'mongoose';
import { Repository } from '@common/common/data/classes/repository.class';
import { IRefreshTokenRepositoryType } from './interfaces/types/refresh-token-repository-type.interface';
import { RevokeRefreshTokenInput } from '../auth/graphql/inputs/revoke-refresh-token.input';
import { RevokeRefreshTokenType } from './graphql/types/revoke-refresh-token.type';

@Injectable()
export class RefreshTokenRepository extends Repository<
  IRefreshTokenRepositoryType
> {
  constructor(
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>
  ) {
    super(refreshTokenModel, RefreshToken.name);
  }

  public async revokeRefreshToken(
    revokeRefreshTokenInput: RevokeRefreshTokenInput,
    session?: ClientSession
  ): Promise<RevokeRefreshTokenType> {
    try {
      const query = this.refreshTokenModel.updateMany(revokeRefreshTokenInput, {
        isRevoked: true
      });

      if (session) query.session(session);

      const result = await query;

      if (result.modifiedCount === 0) {
        return { isRevoked: false };
      }

      return { isRevoked: true };
    } catch (error) {
      this._logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
