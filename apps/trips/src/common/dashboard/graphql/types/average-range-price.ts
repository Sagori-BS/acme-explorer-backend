import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AverageRangePrice {
  @Field(() => Float, { defaultValue: 0 })
  minPrice: number;

  @Field(() => Float, { defaultValue: 0 })
  maxPrice: number;
}
