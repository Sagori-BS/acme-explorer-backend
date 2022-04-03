import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthToken } from './database/auth-token.entity';
import {
  createEntityLog,
  getEntitiesLog,
} from '@shared/functions/log-message-builder';
import { Model } from 'mongoose';
import { EntryNotFoundException } from '@shared/errors/errors';
import { GetAuthTokenByTokenInput } from './graphql/inputs/get-auth-token-by-token.input';
import { LoggerService } from '@shared/logger/logger.service';
import { CreateAuthTokenInternalInput } from './dtos/create-auth-token-internal.input';
import { createUnhashedToken } from './utils/create-unhashed-token';
import { hashToken } from './utils/hash-token';
import { AuthTokenType } from './types/auth-token.type';

@Injectable()
export class AuthTokenRepository {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel(AuthToken.name)
    private readonly authTokenModel: Model<AuthToken>,
  ) {}

  public async getAuthTokenByToken(
    getAuthTokenByTokenInput: GetAuthTokenByTokenInput,
  ): Promise<AuthToken> {
    try {
      this.logger.log(getEntitiesLog(AuthToken.name, getAuthTokenByTokenInput));

      const result = await this.authTokenModel
        .findOne({ ...getAuthTokenByTokenInput, completed: false })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async createAuthToken(
    createAuthTokenInternalInput: CreateAuthTokenInternalInput,
  ): Promise<AuthTokenType> {
    try {
      this.logger.log(
        createEntityLog(AuthToken.name, createAuthTokenInternalInput),
      );

      const { email, origin, type } = createAuthTokenInternalInput;

      const unhashedToken = createUnhashedToken();
      const token = hashToken(unhashedToken);

      const result = new this.authTokenModel({
        email,
        origin,
        token,
        type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await result.save();

      return { ...result.toObject(), token: unhashedToken };
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async updateAuthToken(
    getAuthTokenByTokenInput: GetAuthTokenByTokenInput,
  ): Promise<AuthToken> {
    try {
      const updateAuthToken = {
        completed: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.authTokenModel
        .findOneAndUpdate(getAuthTokenByTokenInput, updateAuthToken, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
