import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './database/trip.entity';
import { ITripRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class TripRepository extends Repository<ITripRepositoryType> {
  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>
  ) {
    super(tripModel, Trip.name);
  }
}
