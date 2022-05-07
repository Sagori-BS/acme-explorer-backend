import { IApplication } from '@trips/common/application/interfaces/entities/application.interface';
import { ISponsorship } from '@trips/common/sponsorship/interfaces/entities/sponsorship.interface';
import { ITrip } from '@trips/common/trip/interfaces/entities/trip';
import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';
import DataLoader from 'dataloader';

export interface IGraphQLRequestContextLoaders {
  applicationLoader: DataLoader<string, IApplication>;
  tripLoader: DataLoader<string, ITrip>;
  userLoader: DataLoader<string, IUser>;
  sponsorshipLoader: DataLoader<string, ISponsorship>;
}
