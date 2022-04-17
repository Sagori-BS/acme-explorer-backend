import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataStore } from './database/application.entity';
import { IDataStoreRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class DataStoreRepository extends Repository<IDataStoreRepositoryType> {
  constructor(
    @InjectModel(DataStore.name)
    private readonly dataStoreModel: Model<DataStore>
  ) {
    super(dataStoreModel, DataStore.name);
  }
}
