import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { UpdateDataStorePayload } from './update-data-store.payload';

@InputType()
export class UpdateDataStoreInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateDataStorePayload;
}