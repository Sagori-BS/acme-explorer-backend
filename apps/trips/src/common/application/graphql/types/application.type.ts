import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Trip } from '@trips/common/trip/graphql/types/trip.type';
import { TripsUser } from '@trips/common/user/graphql/user.type';
import { IApplication } from '../../interfaces/entities/application.interface';
import { ApplicationState } from '../enums/application-states.enum';

@ObjectType()
export class Application implements IApplication {
  @Field(() => ID)
  id: string;

  @Field(() => TripsUser)
  explorer: TripsUser;

  @Field(() => TripsUser)
  manager: TripsUser;

  @Field(() => Trip)
  trip: Trip;

  @Field(() => [String])
  comments: string[];

  @Field(() => ApplicationState)
  state: ApplicationState;

  @Field({ nullable: true })
  reasonRejected?: string;
}
