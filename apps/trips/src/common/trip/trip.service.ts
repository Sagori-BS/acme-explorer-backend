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
import { TripState } from './graphql/enums/trip-states.enum';
import { InvalidOperationError } from '@shared/errors/common/invalid-operation.error';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class TripService extends Service<ITripServiceType> {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly applicationService: ApplicationService
  ) {
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

  public async cancelTrip(
    filterInput: FilterInput,
    updateTripInput: UpdateTripInput
  ): Promise<Trip> {
    filterInput.where = { ...filterInput.where, ...updateTripInput.where };

    const trip = await this.tripRepository.getOneEntity(filterInput);
    const { state } = trip;

    const { reasonCancelled } = updateTripInput.data;

    const applications = await this.applicationService.getEntities({
      where: { trip: trip.id }
    });

    if (applications.length > 0) {
      throw new InvalidOperationError('Cannot cancel trip with applications');
    }

    if (trip.startDate < new Date().toISOString()) {
      throw new InvalidOperationError(
        'You cannot cancel a trip that has already started'
      );
    }

    if (state === TripState.CANCELLED) {
      throw new InvalidOperationError('This Trip is already cancelled');
    }

    if (!reasonCancelled) {
      throw new InvalidOperationError('Reason for cancellation is required');
    }

    const updateEntityInput: UpdateTripInput = {
      where: { id: trip.id },
      data: { state: TripState.CANCELLED, reasonCancelled }
    };

    return this.tripRepository.updateEntity(updateEntityInput);
  }

  public async publishTrip(filterInput: FilterInput): Promise<Trip> {
    filterInput.where = { ...filterInput.where };

    const trip = await this.tripRepository.getOneEntity(filterInput);
    const { state } = trip;

    if (state === TripState.ACTIVE) {
      throw new InvalidOperationError('This Trip is already actived');
    }

    const updateEntityInput: UpdateTripInput = {
      where: { id: trip.id },
      data: { state: TripState.ACTIVE }
    };

    return this.tripRepository.updateEntity(updateEntityInput);
  }
}
