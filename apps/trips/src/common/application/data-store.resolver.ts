import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { DataStore } from './graphql/types/data-store.type';
import { FilterInput } from '@common/common/graphql/inputs/graphql-filter.input';
import { GraphQlFieldNames } from '../../../../../libs/common/src/graphql/enums/graphql-label-types.enum';
import { graphQlIdArgOption } from '@common/common/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@common/common/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import {
  EMPLOYEES,
  UPLOADER
} from '@common/common/auth/arrays/authorized-roles.arrays';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';
import { DataStoreService } from './data-store.service';
import { CreateDataStoreInput } from './graphql/inputs/create-data-store.input';
import { UpdateDataStoreInput } from './graphql/inputs/update-data-store.input';

@Resolver(() => DataStore)
export class DataStoreResolver {
  constructor(private readonly service: DataStoreService) {}

  @AuthorizedRoles(...EMPLOYEES)
  @Query(() => DataStore)
  public async getDataStoreById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<DataStore> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [DataStore])
  public async getAllDataStores(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<DataStore[]> {
    return this.service.getAllEntities(filterInput);
  }

  @AuthorizedRoles(...EMPLOYEES)
  @Query(() => [DataStore])
  public async getDataStores(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<DataStore[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(() => DataStore)
  public async createDataStore(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createDataStoreInput: CreateDataStoreInput
  ): Promise<DataStore> {
    return this.service.createEntity(createDataStoreInput);
  }

  @AuthorizedRoles(...UPLOADER)
  @Mutation(() => DataStore)
  public async updateDataStore(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateDataStoreInput: UpdateDataStoreInput
  ): Promise<DataStore> {
    return this.service.updateEntity(updateDataStoreInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => DataStore)
  public async deleteDataStore(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<DataStore> {
    return this.service.deleteEntity({ id });
  }
}
