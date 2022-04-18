import { ITrip } from '@trips/common/trip/interfaces/entities/trip';
import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';
import { ApplicationState } from '../../graphql/enums/application-states.enum';

export interface IApplication {
  id: string;
  explorer: IUser;
  trip: ITrip;
  comments: string[];
  state: ApplicationState;
  reasonRejected?: string;
}
