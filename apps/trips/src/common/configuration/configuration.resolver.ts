import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Configuration } from './graphql/types/configuration.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { ConfigurationService } from './configuration.service';
import { CreateConfigurationInput } from './graphql/inputs/create-configuration.input';
import { ListConfigurations } from './graphql/types/list-configurations.type';
import { Public } from '@shared/auth/decorators/public-resource.decorator';
import { UpdateConfigurationInput } from './graphql/inputs/update-configuration.input';

@Resolver(() => Configuration)
export class ConfigurationResolver {
  constructor(private readonly service: ConfigurationService) {}

  @Public()
  @Query(() => Configuration)
  public async getConfigurationById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<Configuration> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Configuration])
  public async getAllConfigurations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Configuration[]> {
    return this.service.getAllEntities(filterInput);
  }

  @Public()
  @Query(() => [Configuration])
  public async getConfigurations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Configuration[]> {
    return this.service.getEntities(filterInput);
  }

  @Public()
  @Query(() => ListConfigurations)
  public async listConfigurations(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListConfigurations> {
    return this.service.listEntities(filterInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Configuration)
  public async createConfiguration(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createConfigurationInput: CreateConfigurationInput
  ): Promise<Configuration> {
    return this.service.createEntity(createConfigurationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Configuration)
  public async updateConfiguration(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateConfigurationInput: UpdateConfigurationInput
  ): Promise<Configuration> {
    return this.service.updateEntity(updateConfigurationInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Configuration)
  public async deleteConfiguration(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Configuration> {
    return this.service.deleteEntity({ id });
  }
}
