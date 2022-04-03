import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const uploadOptions: MulterOptions = {
  limits: {
    fileSize: 2000000,
  },
};
