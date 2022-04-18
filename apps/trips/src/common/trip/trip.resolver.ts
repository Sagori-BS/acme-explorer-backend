import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Trip } from './graphql/types/trip.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { graphQlIdArgOption } from '@shared/graphql/types/graphql-delete-mutation-options.type';
import { graphQlFindQueryOptions } from '@shared/graphql/types/graphql-filter-options';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { GraphQlFieldNames } from '@shared/graphql/enums/graphql-label-types.enum';
import { TripService } from './trip.service';
import { MANAGER } from '@shared/auth/arrays/authorized-roles.arrays';
import { Public } from '@shared/auth/decorators/public-resource.decorator';
import { CreateTripInput } from './graphql/inputs/trips/create-trip.input';
import { UpdateTripInput } from './graphql/inputs/update-trip.input';

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly service: TripService) {}

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => Trip)
  public async getTripById(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption)
    id: string
  ): Promise<Trip> {
    return this.service.getOneEntity({ id });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => [Trip])
  public async getAllTrips(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Trip[]> {
    return this.service.getAllEntities(filterInput);
  }

  @Public()
  @Query(() => [Trip])
  public async getTrips(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<Trip[]> {
    return this.service.getEntities(filterInput);
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Trip)
  public async createTrip(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createTripInput: CreateTripInput
  ): Promise<Trip> {
    return this.service.createEntity(createTripInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Trip)
  public async updateTrip(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateTripInput: UpdateTripInput
  ): Promise<Trip> {
    return this.service.updateEntity(updateTripInput);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Trip)
  public async deleteTrip(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Trip> {
    return this.service.deleteEntity({ id });
  }
}
