import { BaseDataLoaderBuilderOptions } from '@common/common/graphql/dataloader/base-dataloader-options.type';
import { baseSingleEntityDataLoaderBuilder } from '@common/common/graphql/dataloader/single-entity.dataloader';
import { ISponsorship } from '@trips/common/sponsorship/interfaces/entities/sponsorship.interface';

export const sponsorshipLoader = (options: BaseDataLoaderBuilderOptions) =>
  baseSingleEntityDataLoaderBuilder<ISponsorship>(options);
