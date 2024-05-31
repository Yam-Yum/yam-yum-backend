import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import crypto from 'crypto';

@Injectable()
export class FileService {
  private readonly BUCKET_NAME = this.configService.get('BUCKET_NAME');
  private readonly BUCKET_REGION = this.configService.get('BUCKET_REGION');
  private readonly ACCESS_KEY = this.configService.get('ACCESS_KEY');
  private readonly SECRET_ACCESS_KEY =
    this.configService.get('SECRET_ACCESS_KEY');

  private s3 = new S3Client({
    credentials: {
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_ACCESS_KEY,
    },
    region: this.BUCKET_REGION,
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadImageToS3(file: Express.Multer.File) {
    // NOTE We can resize image here before sending it to AWS

    const randonImageName = this.randomImageName();

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: randonImageName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return randonImageName;
  }

  async getImageFromS3(imageName: string) {
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: imageName,
    };

    const command = new GetObjectCommand(params);

    const imageUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return imageUrl;
  }

  private randomImageName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }
}
