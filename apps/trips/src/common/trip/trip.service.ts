import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { ITripServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class TripService extends Service<ITripServiceType> {
  constructor(private readonly tripRepository: TripRepository) {
    super(tripRepository);
  }
}
