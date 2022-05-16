import { BaseRepositoryType } from '@shared/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@shared/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { Finder } from '../../database/finder.entity';
import { FinderRepository } from '../../finder.repository';
import { CreateFinderInput } from '../../graphql/inputs/create-finder.input';
import { UpdateFinderInput } from '../../graphql/inputs/update-finder.input';

export interface IFinderRepositoryType extends BaseRepositoryType {
  entity: Finder;
  entityModel: Model<Finder>;
  createEntityInput: CreateFinderInput;
  updateEntityInput: UpdateFinderInput;
}

export interface IFinderServiceType extends BaseServiceType {
  entity: Finder;
  entityRepository: FinderRepository;
  createEntityInput: CreateFinderInput;
  updateEntityInput: UpdateFinderInput;
}
