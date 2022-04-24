import { BaseRepositoryType } from '@shared/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@shared/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { ApplicationRepository } from '../../application.repository';
import { Application } from '../../database/application.entity';
import { CreateCustomApplicationInput } from '../../graphql/inputs/create-custom-application.input';
import { UpdateCustomApplicationInput } from '../../graphql/inputs/update-custom-application.input';

export interface IApplicationRepositoryType extends BaseRepositoryType {
  entity: Application;
  entityModel: Model<Application>;
  createEntityInput: CreateCustomApplicationInput;
  updateEntityInput: UpdateCustomApplicationInput;
}

export interface IApplicationServiceType extends BaseServiceType {
  entity: Application;
  entityRepository: ApplicationRepository;
  createEntityInput: CreateCustomApplicationInput;
  updateEntityInput: UpdateCustomApplicationInput;
}
