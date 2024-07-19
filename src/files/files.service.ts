import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import * as crypto from 'crypto';

@Injectable()
export class FilesService {
  private readonly BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  private readonly BUCKET_REGION = this.configService.get('AWS_S3_BUCKET_REGION');
  private readonly ACCESS_KEY = this.configService.get('AWS_S3_ACCESS_KEY');
  private readonly SECRET_ACCESS_KEY = this.configService.get('AWS_S3_SECRET_ACCESS_KEY');

  private s3 = new S3Client({
    credentials: {
      accessKeyId: this.ACCESS_KEY,
      secretAccessKey: this.SECRET_ACCESS_KEY,
    },
    region: this.BUCKET_REGION,
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFileToS3(file: Express.Multer.File) {
    //TODO: NOTE We can resize File here before sending it to AWS

    const randomFileName = this.randomFileName();

    const params = {
      Bucket: this.BUCKET_NAME,
      Key: randomFileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return randomFileName;
  }

  async getFileFromS3(FileName: string) {
    if (!FileName) return null;
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: FileName,
    };

    const command = new GetObjectCommand(params);

    const FileUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return FileUrl;
  }

  async getMultipleFilesFromS3(FilesNames: Array<string>) {
    const FilesUrls = await Promise.all(
      FilesNames.map(async (FileName) => await this.getFileFromS3(FileName)),
    );
    return FilesUrls;
  }

  private randomFileName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }
}
