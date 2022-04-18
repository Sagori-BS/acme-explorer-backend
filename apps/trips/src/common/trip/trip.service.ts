import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { ITripServiceType } from './interfaces/types/common-type.interface';
import { Trip } from './database/trip.entity';
import { CreateTripInput } from './graphql/inputs/trips/create-trip.input';
import { generateTicket } from './utils/generate-ticket';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { calculatePriceFromStages } from './utils/calculate-price-from-stages';
import { UpdateTripInput } from './graphql/inputs/trips/update-trip.input';
import { ListTrips } from './graphql/types/list-trips.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';

@Injectable()
export class TripService extends Service<ITripServiceType> {
  constructor(private readonly tripRepository: TripRepository) {
    super(tripRepository);
  }

  public async createEntity(
    createEntityInput: CreateTripInput,
    jwtPayload?: JwtPayload
  ): Promise<Trip> {
    const { manager, stages } = createEntityInput;

    createEntityInput.manager = manager ? manager : jwtPayload.id;
    createEntityInput.ticket = generateTicket();
    createEntityInput.price = calculatePriceFromStages(stages);

    return this.tripRepository.createEntity(createEntityInput);
  }

  public async updateEntity(updateEntityInput: UpdateTripInput): Promise<Trip> {
    updateEntityInput.where = { ...updateEntityInput.where, deleted: false };

    const { data } = updateEntityInput;

    if (data.stages) {
      data.price = calculatePriceFromStages(data.stages);
    }

    return this.tripRepository.updateEntity(updateEntityInput);
  }

  public async listEntities(
    filterInput: FilterInput,
    jwtPayload?: JwtPayload
  ): Promise<ListTrips> {
    if (jwtPayload) {
      filterInput.where = { ...filterInput.where, manager: jwtPayload.id };
    }

    return this.tripRepository.listEntities(filterInput);
  }
}
