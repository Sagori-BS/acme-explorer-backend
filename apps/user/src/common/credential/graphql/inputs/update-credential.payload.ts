import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCredentialPayload {
  @Field({ nullable: true })
  confirmed?: boolean;

  @Field({ nullable: true })
  blocked?: boolean;
}
