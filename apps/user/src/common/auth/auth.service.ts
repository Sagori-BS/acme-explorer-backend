import { Inject, Injectable } from '@nestjs/common';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { User } from '../user/database/user.entity';
import { AuthRepository } from './auth.repository';
import { AuthenticationType } from './graphql/types/authentication.type';
import { CredentialService } from '../credential/credential.service';
import * as bcrypt from 'bcryptjs';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';
import { createUserPayload } from './utils/create-user.payload';
import { SocialSignInInput } from '../user/graphql/inputs/social-sign-in.input';
import { CreateAuthTokenInput } from '../auth-token/graphql/inputs/create-auth-token.input';
import { ValidateAuthTokenInput } from '../auth-token/graphql/inputs/validate-auth-token.input';
import { AuthProviders, AuthType } from './utils/auth-providers.enum';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { FirebaseAdminService } from '@user/firebase-admin/firebase-admin.service';
import { getAuthProvider } from './utils/get-auth-provider.util';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { TokensService } from './tokens.service';
import { BlockUserType } from './graphql/types/block-user.type';
import { BlockedUserError } from './errors/blocked-user.error';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { UpdateCredentialInput } from '../credential/graphql/inputs/update-credential.input';
import { UserService } from '../user/user.service';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { LoggerService } from '@shared/logger/logger.service';
import { UserEvents } from '@shared/events/user/user.events';

@Injectable()
export class AuthService {
  @Inject() private readonly loggerService: LoggerService;

  constructor(
    private tokensService: TokensService,
    private authRepository: AuthRepository,
    private credentialService: CredentialService,
    private authTokenService: AuthTokenService,
    private firebaseAdminService: FirebaseAdminService,
    private userService: UserService,
    private readonly logger: LoggerService,

    @Inject(PUB_SUB_CLIENT_TOKEN) private readonly client: PubSubClient,
  ) {}

  public async validateCredential(email: string, password: string) {
    try {
      const credential = await this.credentialService.getCredentialByIdOrEmail({
        email,
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
  ): Promise<AuthenticationType> {
    signUpUserInput.authType = AuthType.PASSWORD;
    signUpUserInput.socialProvider = AuthProviders.Local;

    const user = await this.authRepository.localSignUpUser(signUpUserInput);

    const accessToken = await this.tokensService.signAccessToken(user);

    const authToken = await this.authTokenService.createAuthToken({
      email: user.email,
      type: AuthTokenTypes.CONFIRM_ACCOUNT,
    });

    const createdUser = createUserPayload(user, authToken.token);

    await this.client.send({ type: UserEvents.CreatedUser }, createdUser);

    return { accessToken, user };
  }

  public async signInUser(user: User): Promise<AuthenticationType> {
    const accessToken = await this.tokensService.signAccessToken(user);

    return { accessToken, user };
  }

  public async socialSignUp(
    socialSignInInput: SocialSignInInput,
  ): Promise<AuthenticationType> {
    const { token } = socialSignInInput;

    const userSignInPayload = await this.validateSocialLogin(token);

    const { user, isNew } = await this.authRepository.socialSignUp(
      userSignInPayload,
    );

    const accessToken = await this.tokensService.signAccessToken(user);

    const createdUser = createUserPayload(user);

    if (isNew) {
      this.client.send({ type: UserEvents.CreatedUser }, createdUser);
    }

    return { accessToken, user };
  }

  private async validateSocialLogin(
    token: string,
  ): Promise<{
    name: string;
    email: string;
    password?: string;
    profilePicture?: string;
    socialProvider?: AuthProviders;
  }> {
    try {
      const decodedToken = await this.firebaseAdminService.auth.verifyIdToken(
        token,
      );

      const name = decodedToken.name as string;
      const profilePicture = decodedToken.picture;
      const email = decodedToken.email;
      const socialProvider = decodedToken.firebase.sign_in_provider;

      const ret = {
        name,
        email,
        profilePicture,
        socialProvider: getAuthProvider(socialProvider),
        authType: AuthType.SOCIAL,
      };

      return ret;
    } catch (error) {
      this.loggerService.error(JSON.stringify(`${error.message}`));
      throw error;
    }
  }

  public async resetUserPassword(
    createAuthTokenInput: CreateAuthTokenInput,
  ): Promise<boolean> {
    return await this.authTokenService.resetUserPassword(createAuthTokenInput);
  }

  public async blockUser(
    blockUserInput: BlockUserInput,
  ): Promise<BlockUserType> {
    return await this.authRepository.blockUser(blockUserInput);
  }

  public async unblockUser(
    unblockUserInput: BlockUserInput,
  ): Promise<BlockUserType> {
    const updateCredentialInput: UpdateCredentialInput = {
      where: { email: unblockUserInput.email },
      data: { blocked: false },
    };

    const result = await this.credentialService.updateCredential(
      updateCredentialInput,
    );

    return { blocked: result.blocked };
  }

  public async validateAuthToken(
    validateTokenInput: ValidateAuthTokenInput,
  ): Promise<boolean> {
    return await this.authTokenService.validateAuthToken(validateTokenInput);
  }

  public async updateUserPassword(
    updateUserPasswordInput: UpdateUserPasswordInput,
  ): Promise<UpdateUserPasswordType> {
    return await this.authRepository.updateUserPassword(
      updateUserPasswordInput,
    );
  }
}
