import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQlFieldNames } from '@user/graphql/enums/graphql-label-types.enum';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@shared/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { UploadSelfProfilePictureInput } from './graphql/inputs/upload-self-profile-picture.input';
import { FileService } from './file.service';
import { UploadUserProfilePictureInput } from './graphql/inputs/upload-user-profile-picture.input';
import { Public } from '@shared/auth/decorators/public-resource.decorator';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(_returns => Boolean)
  public async uploadSelfProfilePicture(
    @CurrentUser()
    jwtPayload: JwtPayload,
    @Args(GraphQlFieldNames.INPUT_FIELD)
    uploadSelfProfilePictureInput: UploadSelfProfilePictureInput,
  ): Promise<boolean> {
    try {
      uploadSelfProfilePictureInput.email = jwtPayload.email;

      await this.fileService.uploadPicture(uploadSelfProfilePictureInput);

      return true;
    } catch (error) {
      return false;
    }
  }

  @Public()
  @Mutation(_returns => Boolean)
  public async uploadUserProfilePicture(
    @Args(GraphQlFieldNames.INPUT_FIELD)
    uploadUserProfilePictureInput: UploadUserProfilePictureInput,
  ): Promise<boolean> {
    try {
      await this.fileService.uploadPicture(uploadUserProfilePictureInput);

      return true;
    } catch (error) {
      return false;
    }
  }
}
