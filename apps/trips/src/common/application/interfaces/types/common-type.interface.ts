import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { ApplicationRepository } from '../../application.repository';
import { Application } from '../../database/application.entity';
import { CreateApplicationInput } from '../../graphql/inputs/create-data-store.input';
import { UpdateApplicationInput } from '../../graphql/inputs/update-data-store.input';

export interface IApplicationRepositoryType extends BaseRepositoryType {
  entity: Application;
  entityModel: Model<Application>;
  createEntityInput: CreateApplicationInput;
  updateEntityInput: UpdateApplicationInput;
}

export interface IApplicationServiceType extends BaseServiceType {
  entity: Application;
  entityRepository: ApplicationRepository;
  createEntityInput: CreateApplicationInput;
  updateEntityInput: UpdateApplicationInput;
}
