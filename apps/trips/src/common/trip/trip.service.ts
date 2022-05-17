import { Service } from '@shared/data/classes/service.class';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
import { DeleteStageInput } from './graphql/inputs/stages/delete-stage.input';
import { AddStageInput } from './graphql/inputs/stages/add-stage.input';
import { CreateStageInput } from './graphql/inputs/stages/create-stage.input';
import { ApplicationState } from '../application/graphql/enums/application-states.enum';

@Injectable()
export class TripService extends Service<ITripServiceType> {
  constructor(
    private readonly tripRepository: TripRepository,
    @Inject(forwardRef(() => ApplicationService))
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

  public async updateSelfTrip(
    updateEntityInput: UpdateTripInput,
    jwtPayload: JwtPayload
  ): Promise<Trip> {
    await this.getOneEntity({
      id: updateEntityInput.where.id,
      manager: jwtPayload.id
    });

    return this.updateEntity(updateEntityInput);
  }

  public async deleteSelfTrip(
    jwtPayload: JwtPayload,
    id: string
  ): Promise<Trip> {
    const trip = await this.getOneEntity({
      id,
      manager: jwtPayload.id
    });

    if (trip.state !== TripState.INACTIVE) {
      throw new InvalidOperationError(
        'Cannot delete a trip that is not inactive'
      );
    }

    const applications = await this.applicationService.getEntities({
      where: { trip: trip.id, state: ApplicationState.PAID }
    });

    if (applications.length > 0) {
      throw new InvalidOperationError(
        'Cannot delete trip with applications paid'
      );
    }

    return this.deleteEntity({ id });
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

    const trip = await this.tripRepository.getOneEntity(filterInput.where);
    const { state, startDate } = trip;

    const { reasonCancelled } = updateTripInput.data;

    const applications = await this.applicationService.getEntities({
      where: { trip: trip.id, state: ApplicationState.PAID }
    });

    if (applications.length > 0) {
      throw new InvalidOperationError(
        'Cannot cancel trip with applications paid'
      );
    }

    if (new Date(startDate) < new Date()) {
      throw new InvalidOperationError(
        'Cannot cancel a trip that has already started'
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

    const trip = await this.tripRepository.getOneEntity(filterInput.where);
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

  public async deleteStageFromATrip(
    deleteStageInput: DeleteStageInput,
    jwtPayload: JwtPayload
  ): Promise<Trip> {
    const trip = await this.tripRepository.getOneEntity({
      id: deleteStageInput.trip,
      manager: jwtPayload.id
    });

    const { state, stages } = trip;

    if (state === TripState.ACTIVE) {
      throw new InvalidOperationError('This Trip is already actived');
    }

    const updateEntityInput: UpdateTripInput = {
      where: { id: trip.id },
      data: {
        stages: stages.filter(stage => stage._id !== deleteStageInput.stage)
      }
    };

    return this.tripRepository.updateEntity(updateEntityInput);
  }

  public async addStageFromATrip(
    addStageInput: AddStageInput,
    jwtPayload: JwtPayload
  ): Promise<Trip> {
    const trip = await this.tripRepository.getOneEntity({
      id: addStageInput.trip,
      manager: jwtPayload.id
    });

    const { stages } = trip;

    const createStageInput: CreateStageInput = {
      ...addStageInput
    };

    const updateEntityInput: UpdateTripInput = {
      where: { id: trip.id },
      data: {
        stages: [...stages, createStageInput]
      }
    };

    return this.tripRepository.updateEntity(updateEntityInput);
  }

  private checkIfTripIsStarted(trip: Trip) {
    // Check if trip start date and today the difference is less than 7 days
    const tripStartDate = new Date(trip.startDate);
    const today = new Date();
    const diff = tripStartDate.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    if (diff < 0 || days < 7) {
      throw new InvalidOperationError(
        'Cannot delete a trip if it has already started or it is less than 7 days'
      );
    }
  }
}
