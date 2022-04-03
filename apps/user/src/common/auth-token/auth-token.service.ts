import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';
import { Inject, Injectable } from '@nestjs/common';
import { CredentialService } from '../credential/credential.service';
import { AuthTokenRepository } from './auth-token.repository';
import { AuthToken } from './database/auth-token.entity';
import { CreateAuthTokenInternalInput } from './dtos/create-auth-token-internal.input';
import { CreateAuthTokenInput } from './graphql/inputs/create-auth-token.input';
import { GetAuthTokenByTokenInput } from './graphql/inputs/get-auth-token-by-token.input';
import { ValidateAuthTokenInput } from './graphql/inputs/validate-auth-token.input';
import { hashToken } from './utils/hash-token';
import { Error as MongooseError } from 'mongoose';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { AuthTokenType } from './types/auth-token.type';
import { resetUserPasswordPayload } from './utils/reset-user-password.payload';
import { NotificationEvents } from '@shared/events/notification/notification.events';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly credentailService: CredentialService,
    @Inject(PUB_SUB_CLIENT_TOKEN) private readonly client: PubSubClient,
  ) {}

  public async getAuthTokenByToken(
    getAuthTokenByTokenInput: GetAuthTokenByTokenInput,
  ): Promise<AuthToken> {
    return this.authTokenRepository.getAuthTokenByToken(
      getAuthTokenByTokenInput,
    );
  }

  public async createAuthToken(
    createAuthTokenInternalInput: CreateAuthTokenInternalInput,
  ): Promise<AuthTokenType> {
    return this.authTokenRepository.createAuthToken(
      createAuthTokenInternalInput,
    );
  }

  public async updateAuthToken(
    updateAuthTokenInput: GetAuthTokenByTokenInput,
  ): Promise<AuthToken> {
    return this.authTokenRepository.updateAuthToken(updateAuthTokenInput);
  }

  public async validateAuthToken(
    validateAuthTokenInput: ValidateAuthTokenInput,
  ): Promise<boolean> {
    try {
      const token = hashToken(validateAuthTokenInput.token);

      const result = await this.authTokenRepository.getAuthTokenByToken({
        token,
      });

      if (result.type === AuthTokenTypes.RESET_PASSWORD) {
        await this.credentailService.updatePassword({
          where: { email: result.email },
          data: { password: validateAuthTokenInput.password },
        });
      } else if (result.type === AuthTokenTypes.CONFIRM_ACCOUNT) {
        await this.credentailService.updateCredential({
          where: {
            email: result.email,
          },
          data: {
            confirmed: true,
          },
        });
      }

      await this.authTokenRepository.updateAuthToken({ token });

      return true;
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw error;
      }

      return false;
    }
  }

  public async resetUserPassword(
    createAuthTokenInput: CreateAuthTokenInput,
  ): Promise<boolean> {
    const createAuthTokenInternalInput = new CreateAuthTokenInternalInput();

    createAuthTokenInternalInput.email = createAuthTokenInput.email;
    createAuthTokenInternalInput.type = AuthTokenTypes.RESET_PASSWORD;
    createAuthTokenInternalInput.origin = createAuthTokenInput.origin;

    const authToken = await this.createAuthToken(createAuthTokenInternalInput);

    const resetUserPassword = resetUserPasswordPayload(authToken);

    await this.client.send(
      { type: NotificationEvents.ResetUserPassword },
      resetUserPassword,
    );

    return true;
  }
}
