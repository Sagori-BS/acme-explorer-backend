import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'apps/user/src/common/user/graphql/types/user.type';

@ObjectType()
export class AuthenticationType {
  @Field()
  accessToken: string;

  @Field(_type => User)
  user: User;
}
