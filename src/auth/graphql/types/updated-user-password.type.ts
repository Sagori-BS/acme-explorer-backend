import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserPasswordType {
  @Field()
  passwordUpdated: boolean;
}
