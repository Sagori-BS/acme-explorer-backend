import { AuthorizedRoles } from '@common/common/auth/decorators/authorized-roles.decorator';
import { Picture } from '@common/common/dtos/upload/picture.dto';
import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ALL_ROLES } from '@shared/auth/arrays/authorized-roles.arrays';
import { UploadService } from './upload.service';
import { uploadOptions } from './utils/upload-options.option';

@Controller('upload')
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @AuthorizedRoles(...ALL_ROLES)
  @Post('profilePicture')
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  async uploadPicture(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }

  @AuthorizedRoles(...ALL_ROLES)
  @Delete('file')
  async deleteFile(@Body() picture: Picture) {
    return this.service.deleteFile(picture);
  }
}
