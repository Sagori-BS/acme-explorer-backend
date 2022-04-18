import { Field, ID, InputType } from '@nestjs/graphql';
import { ApplicationState } from '../enums/application-states.enum';

@InputType()
export class UpdateApplicationPayload {
  @Field(() => ID, { nullable: true })
  explorer?: string;

  @Field(() => ID, { nullable: true })
  trip?: string;

  @Field({ nullable: true })
  reasonRejected?: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => ApplicationState, { nullable: true })
  state?: ApplicationState;
}
