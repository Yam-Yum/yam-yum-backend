import { Module } from '@nestjs/common';
import { ReelService } from './reel.service';
import { ReelController } from './reel.controller';
import dataSource from 'src/database/data-source';
import { RecipeVideoProvider } from 'src/recipe/providers/recipe-video.provider';

@Module({
  controllers: [ReelController],
  providers: [
    ReelService,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeVideoProvider,
  ],
})
export class ReelModule {}
