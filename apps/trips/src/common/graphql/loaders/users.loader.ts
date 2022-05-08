import { BaseDataLoaderBuilderOptions } from '@common/common/graphql/dataloader/base-dataloader-options.type';
import { baseSingleEntityDataLoaderBuilder } from '@common/common/graphql/dataloader/single-entity.dataloader';
import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';

export const userLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<IUser>(options);
