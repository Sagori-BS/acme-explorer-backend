import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApplicationState } from '@trips/common/application/graphql/enums/application-states.enum';

@ObjectType()
export class RatioOfApplicationGroupByState {
  @Field(() => ApplicationState)
  state: ApplicationState;

  @Field(() => Float, { defaultValue: 0 })
  ratio: number;
}
