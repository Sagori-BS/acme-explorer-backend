import { BaseDataLoaderBuilderOptions } from '@common/common/graphql/dataloader/base-dataloader-options.type';
import { baseSingleEntityDataLoaderBuilder } from '@common/common/graphql/dataloader/single-entity.dataloader';
import { IApplication } from '@trips/common/application/interfaces/entities/application.interface';

export const applicationLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<IApplication>(options);
