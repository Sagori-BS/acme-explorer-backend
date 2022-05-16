import { ITrip } from '@trips/common/trip/interfaces/entities/trip';

export interface IFavoriteList {
  id: string;
  name: string;
  user: string;
  trips: ITrip[];
}
