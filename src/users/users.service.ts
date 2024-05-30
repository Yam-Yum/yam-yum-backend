import { S3UploadService } from './../s3-upload/s3-upload.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly s3UploadService: S3UploadService) {}

  async registerNewUser(file: Express.Multer.File) {
    const imagename = this.s3UploadService.uploadImageToS3(file);

    // You can store image name into DB
    return imagename;
  }

  async getUser() {
    const imageName =
      'ab1adeb83034b056db6d828011aacd81667fa296bb27e26b44b32f954fc7fe92';

    const imageUrl = await this.s3UploadService.getImageFromS3(imageName);

    return imageUrl;
  }
}
