import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { TripRepository } from '../../trip.repository';
import { Trip } from '../../database/trip.entity';
import { CreateTripInput } from '../../graphql/inputs/create-trip.input';
import { UpdateTripInput } from '../../graphql/inputs/update-trip.input';

export interface ITripRepositoryType extends BaseRepositoryType {
  entity: Trip;
  entityModel: Model<Trip>;
  createEntityInput: CreateTripInput;
  updateEntityInput: UpdateTripInput;
}

export interface ITripServiceType extends BaseServiceType {
  entity: Trip;
  entityRepository: TripRepository;
  createEntityInput: CreateTripInput;
  updateEntityInput: UpdateTripInput;
}
