import { Module } from '@nestjs/common';
import { ReelService } from './reel.service';
import { ReelController } from './reel.controller';
import dataSource from 'src/database/data-source';
import { RecipeVideoProvider } from 'src/recipe/providers/recipe-video.provider';
import { RecipeProvider } from 'src/recipe/providers/recipe.provider';
import { UserProvider } from 'src/users/providers/user.provider';
import { LikeProvider } from './providers/like.provider';
import { CommentProvider } from './providers/comment.provider';
import { FilesService } from 'src/files/files.service';

@Module({
  controllers: [ReelController],
  providers: [
    ReelService,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    ...RecipeVideoProvider,
    ...RecipeProvider,
    ...UserProvider,
    ...LikeProvider,
    ...CommentProvider,
    FilesService,
  ],
})
export class ReelModule {}
