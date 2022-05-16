import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../application/application.repository';
import { TripRepository } from '../trip/trip.repository';
import { tripManagedPerManagerPipeline } from './database/trip-managed-per-manager.pipeline';
import { applicationPerTripPipeline } from './database/application-per-trip.pipeline';
import { ApplicationPerTrip } from './graphql/types/application-per-trip.type';
import { Dashboard } from './graphql/types/dashboard.type';
import { TripManagedPerManager } from './graphql/types/trips-managed-per-manager.type';
import { PricePerTrip } from './graphql/types/price-per-trip.type';
import { pricePerTripPipeline } from './database/price-per-trip.pipeline';
import { RatioOfApplicationGroupByState } from './graphql/types/ratio-of-application-group-by-state.type';
import { ratioOfApplicationGroupByStatePipeline } from './database/ratio-of-application-group-by-state.pipeline';
import { FinderRepository } from '../finder/finder.repository';
import { top10KeywordsPipeline } from './database/top-10-keywords.pipeline';
import { TopKeywords } from './graphql/types/top-keywords';
import { averageRangePricePipeline } from './database/average-range-price.pipeline';
import { AverageRangePrice } from './graphql/types/average-range-price';

@Injectable()
export class DashboardService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly applicationRepository: ApplicationRepository,
    private readonly finderRepository: FinderRepository
  ) {}

  async getAnalitycs(): Promise<Dashboard> {
    const tripManagedPerManager = await this.tripRepository.aggregateEntities<
      TripManagedPerManager
    >(tripManagedPerManagerPipeline);

    return {
      tripManagedPerManager: tripManagedPerManager[0]
    };
  }

  async applicationPerTrip(): Promise<ApplicationPerTrip> {
    const applicationPerTrip = await this.applicationRepository.aggregateEntities<
      ApplicationPerTrip
    >(applicationPerTripPipeline);

    return applicationPerTrip[0];
  }

  async pricePerTrip(): Promise<PricePerTrip> {
    const pricePerTrip = await this.tripRepository.aggregateEntities<
      PricePerTrip
    >(pricePerTripPipeline);

    return pricePerTrip[0];
  }

  async ratioOfApplicationGroupByState(): Promise<
    RatioOfApplicationGroupByState[]
  > {
    const ratioOfApplicationGroupByState = await this.applicationRepository.aggregateEntities<
      RatioOfApplicationGroupByState
    >(ratioOfApplicationGroupByStatePipeline);

    return ratioOfApplicationGroupByState;
  }

  async keywords(): Promise<TopKeywords[]> {
    const keywords = await this.finderRepository.aggregateEntities(
      top10KeywordsPipeline
    );

    return keywords;
  }

  async averageRangePrice(): Promise<AverageRangePrice> {
    const averageRangePrice = await this.finderRepository.aggregateEntities(
      averageRangePricePipeline
    );

    return averageRangePrice[0];
  }
}
