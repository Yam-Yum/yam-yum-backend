import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import * as crypto from 'crypto';

@Injectable()
export class FilesService {
  private readonly BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  private readonly BUCKET_REGION = this.configService.get('AWS_S3_BUCKET_REGION');
  private readonly ACCESS_KEY = this.configService.get('AWS_S3_ACCESS_KEY');
  private readonly SECRET_ACCESS_KEY = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');
  // private readonly storageBaseUrl = this.configService.get('STORAGE_BASE_URL');

  private s3 = new S3Client({
    credentials: {
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_ACCESS_KEY,
    },
    region: this.BUCKET_REGION,
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFileToS3(file: Express.Multer.File) {
    console.log('file: ', file);
    //TODO: NOTE We can resize File here before sending it to AWS

    const randomFileName = this.randomFileName();

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: randomFileName + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    console.log('params: ', params);

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return randomFileName + file.originalname;
  }

  private randomFileName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }
}
