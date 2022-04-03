import { InputType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class UploadUserProfilePictureInput {
  @Field(() => GraphQLUpload)
  file: FileUpload;

  @Field()
  email: string;
}
