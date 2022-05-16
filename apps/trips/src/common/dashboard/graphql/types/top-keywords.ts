import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TopKeywords {
  @Field()
  keyword: string;

  @Field(() => Float, { defaultValue: 0 })
  count: number;
}
