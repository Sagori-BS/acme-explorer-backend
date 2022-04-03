import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UploadSelfProfilePictureInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;

  email: string;
}
