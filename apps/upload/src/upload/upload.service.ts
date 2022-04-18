import { DeleteFileError } from '@shared/errors/upload/delete-file.error';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from '../config/env-key.enum';
import { v4 as uuid } from 'uuid';
import { Endpoint, S3 } from 'aws-sdk';
import { ObjectIdentifier } from 'aws-sdk/clients/s3';
import { UploadPictureError } from '@shared/errors/upload/upload-picture.error';
import { config } from 'aws-sdk';
import { Picture } from '@shared/dtos/upload/picture.dto';

@Injectable()
export class UploadService {
  private spaceEndpoint: string;
  private bucketName: string;
  private spacesEndpoint: Endpoint;
  private s3;

  constructor(private readonly configService: ConfigService) {
    config.update({
      accessKeyId: configService.get(EnvKey.AWS_ACCESS_KEY),
      secretAccessKey: configService.get(EnvKey.AWS_SECRET_KEY),
      region: configService.get(EnvKey.AWS_REGION)
    });

    this.spaceEndpoint = this.configService.get(EnvKey.SPACE_ENDPOINT);
    this.bucketName = this.configService.get(EnvKey.BUCKET_NAME);
    this.spacesEndpoint = new Endpoint(this.spaceEndpoint);
    this.s3 = new S3({ endpoint: this.spacesEndpoint });
  }

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = `${Date.now()}-${uuid()}.${file.originalname
        .split('.')
        .pop()}`;

      const upload = await this.s3
        .upload({
          Bucket: this.bucketName,
          Body: file.buffer,
          Key: fileName,
          ACL: 'public-read'
        })
        .promise();

      return upload.Location;
    } catch (error) {
      throw new UploadPictureError();
    }
  }

  public async deleteFile(picture: Picture): Promise<any> {
    try {
      const key = picture.url.split(`${this.spaceEndpoint}/`).pop();

      await this.s3
        .deleteObject({
          Bucket: this.bucketName,
          Key: key
        })
        .promise();
    } catch (err) {
      throw new DeleteFileError();
    }
    return {};
  }

  public async deleteFiles(pictures: Picture[]): Promise<any> {
    try {
      const keys: ObjectIdentifier[] = [];

      pictures.map(value => {
        const result = value.url.split(`${this.spaceEndpoint}/`).pop();
        keys.push({ Key: result });
      });

      const options: S3.DeleteObjectsRequest = {
        Bucket: this.bucketName,
        Delete: { Objects: keys }
      };

      await this.s3.deleteObjects(options);
    } catch (err) {
      throw new DeleteFileError();
    }
    return {};
  }
}
