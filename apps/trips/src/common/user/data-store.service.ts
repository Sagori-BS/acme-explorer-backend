import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { DataStoreRepository } from './data-store.repository';
import { IDataStoreServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class DataStoreService extends Service<IDataStoreServiceType> {
  constructor(private readonly dataStoreRepository: DataStoreRepository) {
    super(dataStoreRepository);
  }
}
