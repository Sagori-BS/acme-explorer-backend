import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { GraphQlFieldNames } from '@common/common/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { User } from './graphql/types/user.type';
import { UserService } from './user.service';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { graphQlFindQueryOptions } from '@common/common/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { CurrentUser } from '@common/common/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@common/common/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@common/common/auth/interfaces/jwt-payload.interface';
import { AddDeviceTokenInput } from './graphql/inputs/add-device-token.input';
import { Public } from '@common/common/auth/decorators/public-resource.decorator';
import { AuthType, AuthProviders } from 'src/auth/utils/auth-providers.enum';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => User)
  public async getUserById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<User> {
    return this.service.getOneEntity({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User)
  public async self(
    @CurrentUser()
    jwtPayload: JwtPayload
  ): Promise<User> {
    return this.service.getOneEntity({ id: jwtPayload.id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [User])
  public async getAllUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<User[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [User])
  public async getUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<User[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async createUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createUserInput: CreateUserInput
  ): Promise<User> {
    const internalCreateUserInput: CreateUserInput = {
      ...createUserInput,
      authType: AuthType.PASSWORD,
      socialProvider: AuthProviders.Local
    };

    return this.service.createEntity(internalCreateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async updateUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.service.updateEntity(updateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async deleteUser(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<User> {
    return this.service.deleteEntity({ id });
  }

  @Public()
  @Query(() => Boolean)
  public async verifyUserEmail(
    @Args(GraphQlFieldNames.EMAIL_FIELD)
    email: string
  ): Promise<boolean> {
    return this.service.verifyUserEmail({ email });
  }
}
