import { Field, ID, InputType } from '@nestjs/graphql';
import { TripState } from '../enums/trip-states.enum';

@InputType()
export class UpdateTripPayload {
  @Field(() => ID, { nullable: true })
  explorer?: string;

  @Field(() => ID, { nullable: true })
  trip?: string;

  @Field({ nullable: true })
  reasonRejected?: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => TripState, { nullable: true })
  state?: TripState;
}
