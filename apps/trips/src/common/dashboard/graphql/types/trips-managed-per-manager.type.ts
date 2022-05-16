import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TripManagedPerManager {
  @Field(() => Float, { defaultValue: 0 })
  average: number;

  @Field(() => Float, { defaultValue: 0 })
  min: number;

  @Field(() => Float, { defaultValue: 0 })
  max: number;

  @Field(() => Float, { defaultValue: 0 })
  std: number;
}
