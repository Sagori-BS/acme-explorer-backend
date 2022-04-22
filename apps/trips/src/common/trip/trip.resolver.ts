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
import { UpdateTripInput } from './graphql/inputs/trips/update-trip.input';
import { CreateInternalTripInput } from './graphql/inputs/trips/create-internal-trip.input';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { ListTrips } from './graphql/types/list-trips.type';
import { DeleteStageInput } from './graphql/inputs/stages/delete-stage.input';
import { AddStageInput } from './graphql/inputs/stages/add-stage.input';

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

  @Public()
  @Query(() => ListTrips)
  public async listTrips(
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListTrips> {
    return this.service.listEntities(filterInput);
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Trip)
  public async createTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createTripInput: CreateTripInput
  ): Promise<Trip> {
    return this.service.createEntity(createTripInput, jwtPayload);
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

  // Business logic
  @AuthorizedRoles(...MANAGER)
  @Query(() => Trip)
  public async getSelfTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Trip> {
    return this.service.getOneEntity({ manager: jwtPayload.id, id });
  }

  @AuthorizedRoles(...MANAGER)
  @Query(() => ListTrips)
  public async getSelfTrips(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD, graphQlFindQueryOptions)
    filterInput: FilterInput
  ): Promise<ListTrips> {
    return this.service.listEntities(filterInput, jwtPayload);
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Query(() => Trip)
  public async publishTrip(
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Trip> {
    return this.service.publishTrip({ where: { id } });
  }

  @AuthorizedRoles(...MANAGER)
  @Query(() => Trip)
  public async publishSelfTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.ID_FIELD, graphQlIdArgOption) id: string
  ): Promise<Trip> {
    return this.service.publishTrip({ where: { manager: jwtPayload.id, id } });
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Trip)
  public async cancelTrip(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateTripInput: UpdateTripInput
  ): Promise<Trip> {
    return this.service.cancelTrip({}, updateTripInput);
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Trip)
  public async cancelSelfTrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    updateTripInput: UpdateTripInput
  ): Promise<Trip> {
    return this.service.cancelTrip(
      { where: { manager: jwtPayload.id } },
      updateTripInput
    );
  }

  @AuthorizedRoles(UserRoles.ADMIN)
  @Mutation(() => Trip)
  public async createCustomTrip(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    createInternalTripInput: CreateInternalTripInput
  ): Promise<Trip> {
    return this.service.createEntity(createInternalTripInput);
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Trip)
  public async deleteStageFromATrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    deleteStageInput: DeleteStageInput
  ): Promise<Trip> {
    return this.service.deleteStageFromATrip(deleteStageInput, jwtPayload);
  }

  @AuthorizedRoles(...MANAGER)
  @Mutation(() => Trip)
  public async addStageFromATrip(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    addStageInput: AddStageInput
  ): Promise<Trip> {
    return this.service.addStageFromATrip(addStageInput, jwtPayload);
  }
}
