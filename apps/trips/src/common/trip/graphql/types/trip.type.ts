import { ObjectType, ID, Field } from '@nestjs/graphql';
import { TripsUser } from '@trips/common/user/graphql/user.type';
import { ITrip } from '../../interfaces/entities/trip';
import { TripState } from '../enums/trip-states.enum';
import { Stage } from './stage.type';

@ObjectType()
export class Trip implements ITrip {
  @Field(() => ID)
  id: string;

  @Field(() => TripsUser)
  manager: TripsUser;

  @Field()
  title: string;

  @Field()
  ticket: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field(() => [String])
  requirements: string[];

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [String])
  pictures: string[];

  @Field({ nullable: true })
  reasonCancelled?: string;

  @Field(() => [Stage])
  stages: Stage[];

  @Field(() => TripState)
  state: TripState;
}
