import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { UpdateApplicationPayload } from './update-application.payload';

@InputType()
export class UpdateApplicationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateApplicationPayload;
}
