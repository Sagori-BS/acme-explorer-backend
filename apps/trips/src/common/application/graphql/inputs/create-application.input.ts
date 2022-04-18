import { InputType, Field, ID } from '@nestjs/graphql';
import { ApplicationState } from '../enums/application-states.enum';

@InputType()
export class CreateApplicationInput {
  @Field(() => ID)
  explorer: string;

  @Field(() => ID)
  trip: string;

  @Field({ nullable: true })
  reasonRejected?: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => ApplicationState, { nullable: true })
  state?: ApplicationState;
}
