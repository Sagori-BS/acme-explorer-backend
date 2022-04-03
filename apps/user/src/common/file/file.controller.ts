import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CLIENT } from '@shared/auth/arrays/authorized-roles.arrays';
import { AuthorizedRoles } from '@shared/auth/decorators/authorized-roles.decorator';
import { CurrentUser } from '@shared/auth/decorators/current-user.decorator';
import { JwtPayload } from '@shared/auth/interfaces/jwt-payload.interface';
import { FileService } from './file.service';
import { uploadOptions } from './utils/upload-options.option';

@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @AuthorizedRoles(...CLIENT)
  @Post('profilePicture')
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  async uploadMainPicture(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser()
    jwtPayload: JwtPayload,
  ) {
    return await this.fileService.fileUpload(file, jwtPayload.email);
  }
}
