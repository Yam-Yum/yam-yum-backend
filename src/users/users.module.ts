import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { S3UploadService } from 'src/s3-upload/s3-upload.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, S3UploadService],
})
export class UsersModule {}
