import { AuthTokenTypes } from '@common/common/graphql/enums/auth-token-types.enum';
import {
  DEFAULT_LANGUAGE_OPTIONS_DTO,
  RequestLanguageOptionsDto
} from '@common/common/language/dtos/request-language-options.dto';
import { PUB_SUB_CLIENT_TOKEN } from '@common/common/microservices/pub-sub/constants/pub-sub-client.constants';
import { PubSubClient } from '@common/common/microservices/pub-sub/pub-sub-client';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEvents } from '../../../../../libs/common/src/events/user/user.events';
import { LoggerService } from '../../../../../libs/common/src/logger/logger.service';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { CreateAuthTokenInput } from '../auth-token/graphql/inputs/create-auth-token.input';
import { ValidateAuthTokenInput } from '../auth-token/graphql/inputs/validate-auth-token.input';
import { CredentialService } from '../credential/credential.service';
import { UpdateCredentialInput } from '../credential/graphql/inputs/update-credential.input';
import { RevokeRefreshTokenType } from '../refresh-token/graphql/types/revoke-refresh-token.type';
import { User } from '../user/database/user.entity';
import { SocialSignInInput } from '../user/graphql/inputs/social-sign-in.input';
import { AuthRepository } from './auth.repository';
import { BlockedUserError } from './errors/blocked-user.error';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { RefreshAccessTokenInput } from './graphql/inputs/refresh-access-token.input';
import { RevokeRefreshTokenInput } from './graphql/inputs/revoke-refresh-token.input';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { AuthenticationType } from './graphql/types/authentication.type';
import { BlockUserType } from './graphql/types/block-user.type';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { SocialLoginService } from './social-login.service';
import { TokensService } from './tokens.service';
import { AuthProviders, AuthType } from './utils/auth-providers.enum';
import { createUserPayload } from './utils/create-user.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly authRepository: AuthRepository,
    private readonly credentialService: CredentialService,
    private readonly authTokenService: AuthTokenService,
    private readonly socialLoginService: SocialLoginService,
    private readonly logger: LoggerService,

    @Inject(PUB_SUB_CLIENT_TOKEN) private readonly client: PubSubClient
  ) {}

  public async validateCredential(email: string, password: string) {
    try {
      const credential = await this.credentialService.getCredentialByIdOrEmail({
        email
      });

      if (credential.blocked) {
        throw new BlockedUserError();
      }

      return await bcrypt.compare(password, credential.password);
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);

      if (error instanceof BlockedUserError) {
        throw error;
      }

      return false;
    }
  }

  public async signUpUser(
    signUpUserInput: SignUpUserInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<AuthenticationType> {
    signUpUserInput.authType = AuthType.PASSWORD;
    signUpUserInput.socialProvider = AuthProviders.Local;

    const user = await this.authRepository.localSignUpUser(
      signUpUserInput,
      requestLanguageOptionsDto
    );

    const accessToken = await this.tokensService.signAccessToken(user);

    const refreshToken = await this.tokensService.createAndSignRefreshToken(
      user
    );

    const authToken = await this.authTokenService.createAuthToken({
      email: user.email,
      type: AuthTokenTypes.CONFIRM_ACCOUNT
    });

    const createdUser = createUserPayload(user, authToken.token);

    await this.client.send({ type: UserEvents.CreatedUser }, createdUser);

    return { accessToken, refreshToken, user };
  }

  public async signInUser(user: User): Promise<AuthenticationType> {
    const accessToken = await this.tokensService.signAccessToken(user);

    const refreshToken = await this.tokensService.createAndSignRefreshToken(
      user
    );

    return { accessToken, refreshToken, user };
  }

  public async socialSignUp(
    socialSignInInput: SocialSignInInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<AuthenticationType> {
    const { token } = socialSignInInput;

    const userSignInPayload = await this.socialLoginService.getUser(token);

    const { user, isNew } = await this.authRepository.socialSignUp(
      userSignInPayload,
      requestLanguageOptionsDto
    );

    const accessToken = await this.tokensService.signAccessToken(user);

    const refreshToken = await this.tokensService.createAndSignRefreshToken(
      user
    );

    const createdUser = createUserPayload(user);

    if (isNew) {
      await this.client.send({ type: UserEvents.CreatedUser }, createdUser);
    }

    return { accessToken, refreshToken, user };
  }

  public async resetUserPassword(
    createAuthTokenInput: CreateAuthTokenInput
  ): Promise<boolean> {
    return this.authTokenService.resetUserPassword(createAuthTokenInput);
  }

  public async blockUser(
    blockUserInput: BlockUserInput
  ): Promise<BlockUserType> {
    return this.authRepository.blockUser(blockUserInput);
  }

  public async unblockUser(
    unblockUserInput: BlockUserInput
  ): Promise<BlockUserType> {
    const updateCredentialInput: UpdateCredentialInput = {
      where: { email: unblockUserInput.email },
      data: { blocked: false }
    };

    const result = await this.credentialService.updateCredential(
      updateCredentialInput
    );

    return { blocked: result.blocked };
  }

  public async revokeRefreshToken(
    revokeRefreshTokenInput: RevokeRefreshTokenInput
  ): Promise<RevokeRefreshTokenType> {
    return this.tokensService.revokeRefreshToken(revokeRefreshTokenInput);
  }

  public async refreshAccessToken(
    refreshAccessTokenInput: RefreshAccessTokenInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto = DEFAULT_LANGUAGE_OPTIONS_DTO
  ): Promise<AuthenticationType> {
    return this.tokensService.refreshAccessToken(
      refreshAccessTokenInput,
      requestLanguageOptionsDto
    );
  }

  public async validateAuthToken(
    validateTokenInput: ValidateAuthTokenInput
  ): Promise<boolean> {
    return this.authTokenService.validateAuthToken(validateTokenInput);
  }

  public async updateUserPassword(
    updateUserPasswordInput: UpdateUserPasswordInput
  ): Promise<UpdateUserPasswordType> {
    return this.authRepository.updateUserPassword(updateUserPasswordInput);
  }
}
