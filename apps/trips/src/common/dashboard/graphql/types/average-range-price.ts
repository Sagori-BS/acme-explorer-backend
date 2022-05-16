import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AverageRangePrice {
  @Field(() => Float, { defaultValue: 0 })
  minPrice: string;

  @Field(() => Float, { defaultValue: 0 })
  maxPrice: number;
}
