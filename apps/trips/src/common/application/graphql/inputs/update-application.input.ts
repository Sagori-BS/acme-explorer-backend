import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { UpdateApplicationPayload } from './update-application.payload';

@InputType()
export class UpdateApplicationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateApplicationPayload;
}
