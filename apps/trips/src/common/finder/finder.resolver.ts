import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import {
  ALL_ROLES,
  EXPLORER,
  MANAGER
} from '@shared/auth/arrays/authorized-roles.arrays';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { Finder } from './graphql/types/finder.type';
import { FinderService } from './finder.service';
import { ListFinders } from './graphql/types/list-finders.type';
import { UpdateFinderInput } from './graphql/inputs/update-finder.input';
import { CreateFinderInput } from './graphql/inputs/create-finder.input';

@Resolver(() => Finder)
export class FinderResolver {
  constructor(private readonly service: FinderService) {}

  @AuthorizedRoles(...ALL_ROLES)
  @Query(() => Finder)
  public async getFinderById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<Finder> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Finder])
  public async getAllFinders(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Finder[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Finder])
  public async getFinders(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Finder[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => ListFinders)
  public async listFinders(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListFinders> {
    return this.service.listEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Finder)
  public async deleteFinder(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Finder> {
    return this.service.deleteEntity({ id });
  }

  // Business logic
  @AuthorizedRoles(UserRoles.EXPLORER, ...MANAGER)
  @Query(() => ListFinders)
  public async getSelfFinders(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListFinders> {
    return this.service.listEntities(filterInput, jwtPayload);
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Finder)
  public async createSelfFinder(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createFinderInput: CreateFinderInput
  ): Promise<Finder> {
    return this.service.createSelfFinder(createFinderInput, jwtPayload);
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Finder)
  public async updateSelfFinder(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateFinderInput: UpdateFinderInput
  ): Promise<Finder> {
    return this.service.updateSelfFinder(updateFinderInput, jwtPayload);
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Finder)
  public async deleteSelfFinder(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Finder> {
    return this.service.deleteSelfFinder(id, jwtPayload);
  }
}
