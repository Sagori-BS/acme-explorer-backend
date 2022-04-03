import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FilterInput } from '@user/graphql/inputs/graphql-filter.input';
import { GraphQlFieldNames } from '@user/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@user/graphql/types/graphql-delete-mutation-options.type';
import { User } from './graphql/types/user.type';
import { UserService } from './user.service';
import { UpdateUserInput } from './graphql/inputs/update-user.input';
import { graphQlFindQueryOptions } from '@user/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { CreateUserInput } from './graphql/inputs/create-user.input';
import { AuthProviders, AuthType } from '../auth/utils/auth-providers.enum';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { ADMIN } from '@shared/auth/arrays/authorized-roles.arrays';

@Resolver(_of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @AuthorizedRoles(...ADMIN)
  @Query(_returns => User)
  public async getUserById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string,
  ): Promise<User> {
    return this.userService.getOneEntity({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Query(_returns => User)
  public async self(
    @CurrentUser()
    jwtPayload: JwtPayload,
  ): Promise<User> {
    return await this.userService.getOneEntity({ id: jwtPayload.id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(_returns => [User])
  public async getAllUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<User[]> {
    return await this.userService.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(_returns => [User])
  public async getUsers(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput,
  ): Promise<User[]> {
    return await this.userService.getEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => User)
  public async createUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createUserInput: CreateUserInput,
  ): Promise<User> {
    const internalCreateUserInput: CreateUserInput = {
      ...createUserInput,
      authType: AuthType.PASSWORD,
      socialProvider: AuthProviders.Local,
    };

    return await this.userService.createEntity(internalCreateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => User)
  public async updateUser(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return await this.userService.updateEntity(updateUserInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(_of => User)
  public async deleteUser(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string,
  ): Promise<User> {
    return await this.userService.deleteEntity({ id });
  }
}
