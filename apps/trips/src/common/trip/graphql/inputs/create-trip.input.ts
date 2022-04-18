import { InputType, Field, ID } from '@nestjs/graphql';
import { TripState } from '../enums/trip-states.enum';

@InputType()
export class CreateTripInput {
  @Field(() => ID)
  explorer: string;

  @Field(() => ID)
  trip: string;

  @Field({ nullable: true })
  reasonRejected?: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => TripState, { nullable: true })
  state?: TripState;
}
