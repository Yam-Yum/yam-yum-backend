import { Module } from '@nestjs/common';
import { FileService } from './fileModule.service';

@Module({
  providers: [FileService],
})
export class FileModule {}
