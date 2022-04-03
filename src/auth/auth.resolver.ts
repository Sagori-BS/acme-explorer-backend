import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { AuthService } from './auth.service';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { AuthenticationType } from './graphql/types/authentication.type';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@common/common/auth/decorators/current-user.decorator';
import { CreateCredentialInput } from '../credential/graphql/inputs/create-credential.input';
import { ValidateAuthTokenInput } from '../auth-token/graphql/inputs/validate-auth-token.input';
import { CreateAuthTokenInput } from '../auth-token/graphql/inputs/create-auth-token.input';
import { JwtAuthGuard } from '../../../../../libs/common/src/auth/guards/jwt-auth.guard';
import { JwtPayload } from '../../../../../libs/common/src/auth/interfaces/jwt-payload.interface';
import { Public } from '@common/common/auth/decorators/public-resource.decorator';
import { UserService } from '../user/user.service';
import { User as UserEntity } from '../user/database/user.entity';
import { SocialSignInInput } from '../user/graphql/inputs/social-sign-in.input';
import { UpdateUserInput } from '../user/graphql/inputs/update-user.input';
import { UpdateUserPayload } from '../user/graphql/inputs/update-user.payload';
import { User } from '../user/graphql/types/user.type';
import { RefreshAccessTokenInput } from './graphql/inputs/refresh-access-token.input';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { RevokeRefreshTokenType } from '../refresh-token/graphql/types/revoke-refresh-token.type';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { BlockUserType } from './graphql/types/block-user.type';
import { RevokeRefreshTokenInput } from './graphql/inputs/revoke-refresh-token.input';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { LanguageCodeEnum } from '@common/common/language/enum/language-code.enum';
import { GetRequestLanguage } from '@common/common/language/decorators/get-request-language.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Public()
  @Mutation(() => AuthenticationType)
  public async signUpUser(
    @GetRequestLanguage() language: LanguageCodeEnum,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signUpUserInput: SignUpUserInput
  ): Promise<AuthenticationType> {
    return this.authService.signUpUser(signUpUserInput, { language });
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthenticationType)
  public async signInUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signInUserInput: CreateCredentialInput,
    @CurrentUser() user: UserEntity
  ): Promise<AuthenticationType> {
    return this.authService.signInUser(user);
  }

  @Public()
  @Mutation(() => AuthenticationType)
  public async socialSignIn(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    socialSignInInput: SocialSignInInput,
    @GetRequestLanguage() language: LanguageCodeEnum
  ): Promise<AuthenticationType> {
    return this.authService.socialSignUp(socialSignInInput, { language });
  }

  @Public()
  @Mutation(() => Boolean)
  public async resetUserPassword(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createAuthTokenInput: CreateAuthTokenInput
  ): Promise<boolean> {
    return this.authService.resetUserPassword(createAuthTokenInput);
  }

  @Mutation(() => UpdateUserPasswordType)
  public async updateSelfPassword(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPassword: UpdateUserPasswordInput
  ): Promise<UpdateUserPasswordType> {
    updateUserPassword.email = jwtPayload.email;
    updateUserPassword.userId = jwtPayload.id;

    return this.authService.updateUserPassword(updateUserPassword);
  }

  @Public()
  @Mutation(() => Boolean)
  public async validateToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    validateTokenInput: ValidateAuthTokenInput
  ): Promise<boolean> {
    return this.authService.validateAuthToken(validateTokenInput);
  }

  @Public()
  @Mutation(() => AuthenticationType)
  public async refreshAccessToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    refreshAccessTokenInput: RefreshAccessTokenInput,
    @GetRequestLanguage() language: LanguageCodeEnum
  ): Promise<AuthenticationType> {
    return this.authService.refreshAccessToken(refreshAccessTokenInput, {
      language
    });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  public async updateSelf(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPayload: UpdateUserPayload,
    @GetRequestLanguage() language: LanguageCodeEnum
  ): Promise<User> {
    const updateUserInput: UpdateUserInput = {
      where: { id: jwtPayload.id },
      data: updateUserPayload
    };

    return this.userService.updateEntity(updateUserInput, { language });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => RevokeRefreshTokenType)
  public async revokeRefreshToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    revokeRefreshTokenInput: RevokeRefreshTokenInput
  ): Promise<RevokeRefreshTokenType> {
    return this.authService.revokeRefreshToken(revokeRefreshTokenInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => BlockUserType)
  public async blockUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    blockUserInput: BlockUserInput
  ): Promise<BlockUserType> {
    return this.authService.blockUser(blockUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => BlockUserType)
  public async unblockUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    unblockUserInput: BlockUserInput
  ): Promise<BlockUserType> {
    return this.authService.unblockUser(unblockUserInput);
  }
}
