import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from '@common/common/auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, JwtStrategy, ...GlobalJwtAuthAndRolesGuard],
  exports: [UploadService],
})
export class UploadModule {}
