import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';
import { ApplicationState } from '../../graphql/enums/application-states.enum';

export interface IApplication {
  id: string;
  explorer: IUser;
  comments: string[];
  state: ApplicationState;
  reasonRejected?: string;
}
