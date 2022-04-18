import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { UpdateTripPayload } from './update-trip.payload';

@InputType()
export class UpdateTripInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateTripPayload;
}
