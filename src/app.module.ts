import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { S3UploadModule } from './s3-upload/s3-upload.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), S3UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
