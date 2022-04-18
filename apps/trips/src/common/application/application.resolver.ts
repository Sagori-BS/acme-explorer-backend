import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Application } from './graphql/types/application.type';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@common/common/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { ApplicationService } from './application.service';
import { ALL_ROLES } from '@shared/auth/arrays/authorized-roles.arrays';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly service: ApplicationService) {}

  @AuthorizedRoles(...ALL_ROLES)
  @Query(() => Application)
  public async getApplicationById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<Application> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Application])
  public async getAllApplications(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Application[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...ALL_ROLES)
  @Query(() => [Application])
  public async getApplications(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Application[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(...ALL_ROLES)
  @Mutation(() => Application)
  public async createApplication(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createApplicationInput: CreateApplicationInput
  ): Promise<Application> {
    return this.service.createEntity(createApplicationInput);
  }

  @AuthorizedRoles(...ALL_ROLES)
  @Mutation(() => Application)
  public async updateApplication(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateApplicationInput: UpdateApplicationInput
  ): Promise<Application> {
    return this.service.updateEntity(updateApplicationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Application)
  public async deleteApplication(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Application> {
    return this.service.deleteEntity({ id });
  }
}
