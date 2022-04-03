import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RevokeRefreshTokenType {
  @Field()
  isRevoked: boolean;
}
