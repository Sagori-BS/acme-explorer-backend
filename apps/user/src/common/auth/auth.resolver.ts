import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQlFieldNames } from '@user/graphql/enums/graphql-label-types.enum';
import { AuthService } from './auth.service';
import { SignUpUserInput } from './graphql/inputs/sign-up-user.input';
import { AuthenticationType } from './graphql/types/authentication.type';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { CreateCredentialInput } from '../credential/graphql/inputs/create-credential.input';
import { ValidateAuthTokenInput } from '../auth-token/graphql/inputs/validate-auth-token.input';
import { CreateAuthTokenInput } from '../auth-token/graphql/inputs/create-auth-token.input';
import { Public } from '@shared/auth/decorators/public-resource.decorator';
import { UserService } from '../user/user.service';
import { User as UserEntity } from '../user/database/user.entity';
import { SocialSignInInput } from '../user/graphql/inputs/social-sign-in.input';
import { UpdateUserInput } from '../user/graphql/inputs/update-user.input';
import { UpdateUserPayload } from '../user/graphql/inputs/update-user.payload';
import { User } from '../user/graphql/types/user.type';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { BlockUserType } from './graphql/types/block-user.type';
import { BlockUserInput } from './graphql/inputs/block-user.input';
import { UpdateUserPasswordInput } from './graphql/inputs/update-user-password.input';
import { UpdateUserPasswordType } from './graphql/types/updated-user-password.type';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '@shared/auth/guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Mutation(_of => AuthenticationType)
  public async signUpUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signUpUserInput: SignUpUserInput,
  ): Promise<AuthenticationType> {
    return await this.authService.signUpUser(signUpUserInput);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Mutation(_of => AuthenticationType)
  public async signInUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    signInUserInput: CreateCredentialInput,
    @CurrentUser() user: UserEntity,
  ): Promise<AuthenticationType> {
    return await this.authService.signInUser(user);
  }

  @Public()
  @Mutation(_of => AuthenticationType)
  public async socialSignIn(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    socialSignInInput: SocialSignInInput,
  ): Promise<AuthenticationType> {
    return await this.authService.socialSignUp(socialSignInInput);
  }

  @Public()
  @Mutation(_of => Boolean)
  public async resetUserPassword(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createAuthTokenInput: CreateAuthTokenInput,
  ): Promise<boolean> {
    return await this.authService.resetUserPassword(createAuthTokenInput);
  }

  @Mutation(_of => UpdateUserPasswordType)
  public async updateSelfPassword(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPassword: UpdateUserPasswordInput,
  ): Promise<UpdateUserPasswordType> {
    updateUserPassword.email = jwtPayload.email;
    updateUserPassword.userId = jwtPayload.id;

    return await this.authService.updateUserPassword(updateUserPassword);
  }

  @Public()
  @Mutation(_of => Boolean)
  public async validateToken(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    validateTokenInput: ValidateAuthTokenInput,
  ): Promise<boolean> {
    return await this.authService.validateAuthToken(validateTokenInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(_of => User)
  public async updateSelf(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserPayload: UpdateUserPayload,
  ): Promise<User> {
    const updateUserInput: UpdateUserInput = {
      where: { id: jwtPayload.id },
      data: updateUserPayload,
    };

    return await this.userService.updateEntity(updateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => BlockUserType)
  public async blockUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    blockUserInput: BlockUserInput,
  ): Promise<BlockUserType> {
    return await this.authService.blockUser(blockUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => BlockUserType)
  public async unblockUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    unblockUserInput: BlockUserInput,
  ): Promise<BlockUserType> {
    return await this.authService.unblockUser(unblockUserInput);
  }
}
