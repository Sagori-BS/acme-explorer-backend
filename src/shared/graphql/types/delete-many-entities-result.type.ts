import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteManyEntitiesResult {
  @Field()
  updatedEntities: number;

  @Field()
  receivedEntities: number;
}
