import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { DataStoreRepository } from '../../data-store.repository';
import { DataStore } from '../../database/application.entity';
import { CreateDataStoreInput } from '../../graphql/inputs/create-data-store.input';
import { UpdateDataStoreInput } from '../../graphql/inputs/update-data-store.input';

export interface IDataStoreRepositoryType extends BaseRepositoryType {
  entity: DataStore;
  entityModel: Model<DataStore>;
  createEntityInput: CreateDataStoreInput;
  updateEntityInput: UpdateDataStoreInput;
}

export interface IDataStoreServiceType extends BaseServiceType {
  entity: DataStore;
  entityRepository: DataStoreRepository;
  createEntityInput: CreateDataStoreInput;
  updateEntityInput: UpdateDataStoreInput;
}
