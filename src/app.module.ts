import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './FileModule/fileModule';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
