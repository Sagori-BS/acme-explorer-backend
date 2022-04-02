import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DealerContact {
  @Field()
  agent: string;

  @Field()
  telephoneNumber: string;
}
