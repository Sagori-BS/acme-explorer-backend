import { Module } from '@nestjs/common';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService, JwtStrategy, ...GlobalJwtAuthAndRolesGuard],
})
export class FileModule {}
