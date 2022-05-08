import { ITrip } from '@trips/common/trip/interfaces/entities/trip';

export interface IUserPreferences {
  id: string;
  user: string;
  trips: ITrip[];
}
