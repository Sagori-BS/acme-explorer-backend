import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlockUserType {
  @Field()
  blocked: boolean;
}
