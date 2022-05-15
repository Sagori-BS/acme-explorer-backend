import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { IApplicationServiceType } from './interfaces/types/common-type.interface';
import { Application } from './database/application.entity';
import { TripService } from '../trip/trip.service';
import { CreateCustomApplicationInput } from './graphql/inputs/create-custom-application.input';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UpdateCustomApplicationInput } from './graphql/inputs/update-custom-application.input';
import { ListApplications } from './graphql/types/list-applications.type';
import { FilterInput } from '@shared/graphql/inputs/graphql-filter.input';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { CreateApplicationInput } from './graphql/inputs/create-application.input';
import { TripState } from '../trip/graphql/enums/trip-states.enum';
import { InvalidOperationException } from '@shared/errors/errors';
import { Trip } from '../trip/database/trip.entity';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class ApplicationService extends Service<IApplicationServiceType> {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly tripService: TripService,
    private readonly configurationService: ConfigurationService
  ) {
    super(applicationRepository);
  }

  public async listEntities(
    filterInput: FilterInput,
    jwtPayload?: JwtPayload
  ): Promise<ListApplications> {
    if (jwtPayload) {
      const { id, role } = jwtPayload;
      if (role === UserRoles.MANAGER) {
        filterInput.where = {
          ...filterInput.where,
          manager: id
        };
      } else {
        filterInput.where = {
          ...filterInput.where,
          explorer: id
        };
      }
    }
    return this.applicationRepository.listEntities(filterInput);
  }

  public async createEntity(
    createCustomApplicationInput: CreateCustomApplicationInput
  ): Promise<Application> {
    const trip = await this.tripService.getOneEntity({
      id: createCustomApplicationInput.trip
    });

    if (!createCustomApplicationInput.manager) {
      createCustomApplicationInput.manager = trip.manager.id;
    }

    this.checkIfTripIsStarted(trip);

    return this.applicationRepository.createEntity(
      createCustomApplicationInput
    );
  }

  public async createSelfApplication(
    jwtPayload: JwtPayload,
    createApplicationInput: CreateApplicationInput
  ): Promise<Application> {
    const trip = await this.tripService.getOneEntity({
      id: createApplicationInput.trip
    });

    if (trip.state !== TripState.ACTIVE) {
      throw new InvalidOperationException('Trip is not active');
    }

    this.checkIfTripIsStarted(trip);

    const createCustomApplicationInput: CreateCustomApplicationInput = {
      ...createApplicationInput,
      explorer: jwtPayload.id,
      manager: trip.manager.id
    };

    return this.applicationRepository.createEntity(
      createCustomApplicationInput
    );
  }

  public async updateSelfApplication(
    jwtPayload: JwtPayload,
    updateCustomApplicationInput: UpdateCustomApplicationInput
  ): Promise<Application> {
    const { id } = updateCustomApplicationInput.where;

    await this.applicationRepository.getOneEntity({
      explorer: jwtPayload.id,
      id
    });

    return this.applicationRepository.updateEntity(
      updateCustomApplicationInput
    );
  }

  public async acceptOrRejectApplication(
    jwtPayload: JwtPayload,
    updateCustomApplicationInput: UpdateCustomApplicationInput
  ): Promise<Application> {
    const { id } = updateCustomApplicationInput.where;

    await this.applicationRepository.getOneEntity({
      manager: jwtPayload.id,
      id
    });

    return this.applicationRepository.updateEntity(
      updateCustomApplicationInput
    );
  }

  public async flatRate(): Promise<number> {
    const flatRate = await this.configurationService.getOneEntity({});
    return flatRate.flatRate;
  }

  private checkIfTripIsStarted(trip: Trip) {
    // Check if trip start date and today the difference is less than 7 days
    const tripStartDate = new Date(trip.startDate);
    const today = new Date();
    const diff = tripStartDate.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    if (diff < 0 || days < 7) {
      throw new InvalidOperationException('You can not apply for this trip');
    }
  }
}
