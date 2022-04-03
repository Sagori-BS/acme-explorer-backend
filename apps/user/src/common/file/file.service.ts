import { Inject } from '@nestjs/common';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { UploadEvents } from '@shared/events/upload/upload.events';
import { UploadSelfProfilePictureInput } from './graphql/inputs/upload-self-profile-picture.input';

export class FileService {
  constructor(
    @Inject(PUB_SUB_CLIENT_TOKEN) private readonly client: PubSubClient,
  ) {}

  public async uploadPicture(
    uploadSelfProfilePictureInput: UploadSelfProfilePictureInput,
  ): Promise<any> {
    try {
      const result = await uploadSelfProfilePictureInput.file;

      const filename = result.file.filename;

      const stream = result.file.createReadStream();

      const chunks = [];

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        let buffer: Buffer;

        stream.on('data', function(chunk) {
          chunks.push(chunk);
        });

        stream.on('end', function() {
          buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        stream.on('error', reject);
      });

      return await this.client.send(
        { type: UploadEvents.UploadPicture },
        {
          file: buffer,
          email: uploadSelfProfilePictureInput.email,
          filename,
        },
      );
    } catch (err) {
      throw err;
    }
  }

  public async fileUpload(
    file: Express.Multer.File,
    email: string,
  ): Promise<any> {
    try {
      return await this.client.send(
        { type: UploadEvents.UploadPicture },
        {
          file: file.buffer,
          email,
          filename: file.originalname,
        },
      );
    } catch (err) {
      throw err;
    }
  }
}
