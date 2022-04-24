import { ITrip } from '@trips/common/trip/interfaces/entities/trip';
import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';
import { SponsorshipState } from '../../graphql/enums/sponsorship-states.enum';

export interface ISponsorship {
  id: string;
  sponsor: IUser;
  banner: string;
  link: string;
  trip: ITrip;
  state: SponsorshipState;
}
