import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Application } from './graphql/types/application.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { ApplicationService } from './application.service';
import { EXPLORER, MANAGER } from '@shared/auth/arrays/authorized-roles.arrays';
import { CreateApplicationInput } from './graphql/inputs/create-application.input';
import { UpdateApplicationInput } from './graphql/inputs/update-application.input';
import { ListApplications } from './graphql/types/list-applications.type';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { CreateCustomApplicationInput } from './graphql/inputs/create-custom-application.input';
import { UpdateCustomApplicationInput } from './graphql/inputs/update-custom-application.input';
import { ApplicationState } from './graphql/enums/application-states.enum';
import { RejectApplicationInput } from './graphql/inputs/reject-application.input';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly service: ApplicationService) {}

  @AuthorizedRoles(...MANAGER)
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

  @AuthorizedRoles(...MANAGER)
  @Query(() => [Application])
  public async getApplications(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Application[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => ListApplications)
  public async listApplications(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListApplications> {
    return this.service.listEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Application)
  public async createApplication(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createCustomApplicationInput: CreateCustomApplicationInput
  ): Promise<Application> {
    return this.service.createEntity(createCustomApplicationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Application)
  public async updateApplication(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateCustomApplicationInput: UpdateCustomApplicationInput
  ): Promise<Application> {
    return this.service.updateEntity(updateCustomApplicationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Application)
  public async deleteApplication(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Application> {
    return this.service.deleteEntity({ id });
  }

  // Business logic
  @AuthorizedRoles(UserRoles.EXPLORER, ...MANAGER)
  @Query(() => ListApplications)
  public async getSelfApplications(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListApplications> {
    return this.service.listEntities(filterInput, jwtPayload);
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Application)
  public async createSelfApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createApplicationInput: CreateApplicationInput
  ): Promise<Application> {
    return this.service.createSelfApplication(
      jwtPayload,
      createApplicationInput
    );
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Application)
  public async updateSelfApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateApplicationInput: UpdateApplicationInput
  ): Promise<Application> {
    return this.service.updateSelfApplication(
      jwtPayload,
      updateApplicationInput
    );
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Application)
  public async cancelSelfApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Application> {
    return this.service.updateSelfApplication(jwtPayload, {
      where: { id },
      data: { state: ApplicationState.CANCELLED }
    });
  }

  @AuthorizedRoles(...EXPLORER)
  @Mutation(() => Application)
  public async paySelfApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Application> {
    return this.service.updateSelfApplication(jwtPayload, {
      where: { id },
      data: { state: ApplicationState.PAID }
    });
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Application)
  public async acceptApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Application> {
    return this.service.acceptOrRejectApplication(jwtPayload, {
      where: { id },
      data: { state: ApplicationState.DUE }
    });
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Application)
  public async rejectApplication(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    rejectApplicationInput: RejectApplicationInput
  ): Promise<Application> {
    return this.service.acceptOrRejectApplication(jwtPayload, {
      where: { id: rejectApplicationInput.id },
      data: {
        state: ApplicationState.REJECTED,
        reasonRejected: rejectApplicationInput.reasonRejected
      }
    });
  }
}
