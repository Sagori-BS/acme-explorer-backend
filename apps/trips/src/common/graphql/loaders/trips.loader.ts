import { BaseDataLoaderBuilderOptions } from '@common/common/graphql/dataloader/base-dataloader-options.type';
import { baseSingleEntityDataLoaderBuilder } from '@common/common/graphql/dataloader/single-entity.dataloader';
import { ITrip } from '@trips/common/trip/interfaces/entities/trip';

export const tripLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<ITrip>(options);
