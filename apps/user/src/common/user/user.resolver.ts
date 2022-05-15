import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './graphql/types/user.type';
import { UserService } from './user.service';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { AuthProviders, AuthType } from '../auth/utils/auth-providers.enum';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { ListUsers } from './graphql/types/list-users.type';

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
  @Query(() => ListUsers)
  public async listUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListUsers> {
    return this.service.listEntities(filterInput);
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

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async lockUser(
    @Args(GraphQlFieldNames.ID_FIELD)
    id: string
  ): Promise<User> {
    return this.service.lockUser(id);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => User)
  public async unlockUser(
    @Args(GraphQlFieldNames.ID_FIELD)
    id: string
  ): Promise<User> {
    return this.service.unlockUser(id);
  }
}
