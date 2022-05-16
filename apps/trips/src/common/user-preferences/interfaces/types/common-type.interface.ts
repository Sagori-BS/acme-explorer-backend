import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { FavoriteList } from '../../database/favorite-list.entity';
import { FavoriteListRepository } from '../../favorite-list.repository';
import { Model } from 'mongoose';

export interface IFavoriteListRepositoryType extends BaseRepositoryType {
  entity: FavoriteList;
  entityModel: Model<FavoriteList>;
  createEntityInput: any;
  updateEntityInput: any;
}

export interface IFavoriteListServiceType extends BaseServiceType {
  entity: FavoriteList;
  entityRepository: FavoriteListRepository;
  createEntityInput: any;
  updateEntityInput: any;
}
