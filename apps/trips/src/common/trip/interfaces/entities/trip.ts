import { IUser } from '@trips/common/user/interfaces/entities/user-entity.interface';
import { IStage } from './stage';

export interface ITrip {
  id: string;
  title: string;
  ticket: string;
  description: string;
  price: number;
  requirements: string[];
  startDate: string;
  endDate: string;
  pictures: string[];
  reasonCancelled?: string;
  stages: IStage[];
  manager: IUser;
}
