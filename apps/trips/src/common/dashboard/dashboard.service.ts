import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../application/application.repository';
import { TripRepository } from '../trip/trip.repository';
import { tripManagedPerManagerPipeline } from './database/trip-managed-per-manager.pipeline';
import { applicationsPerTripPipeline } from './database/applications-per-trip.pipeline';
import { ApplicationsPerTrip } from './graphql/types/applications-per-trip.type';
import { Dashboard } from './graphql/types/dashboard.type';
import { TripManagedPerManager } from './graphql/types/trips-managed-per-manager.type';

@Injectable()
export class DashboardService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly applicationRepository: ApplicationRepository
  ) {}

  async getAnalitycs(): Promise<Dashboard> {
    const tripManagedPerManager = await this.tripRepository.aggregateEntities<
      TripManagedPerManager
    >(tripManagedPerManagerPipeline);

    return {
      tripManagedPerManager: tripManagedPerManager[0]
    };
  }

  async applicationsPerTrip(): Promise<ApplicationsPerTrip> {
    const applicationsPerTrip = await this.applicationRepository.aggregateEntities<
      ApplicationsPerTrip
    >(applicationsPerTripPipeline);

    return applicationsPerTrip[0];
  }
}
