import { Injectable } from '@nestjs/common';
import { TripRepository } from '../trip/trip.repository';
import { tripManagedPerManagerPipeline } from './database/trip-managed-per-manager.pipeline';
import { Dashboard } from './graphql/types/dashboard.type';
import { TripManagedPerManager } from './graphql/types/trips-managed-per-manager.type';

@Injectable()
export class DashboardService {
  constructor(private readonly tripRepository: TripRepository) {}

  async getAnalitycs(): Promise<Dashboard> {
    const tripManagedPerManager = await this.tripRepository.aggregateEntities<
      TripManagedPerManager
    >(tripManagedPerManagerPipeline);

    return {
      tripManagedPerManager: tripManagedPerManager[0]
    };
  }
}
