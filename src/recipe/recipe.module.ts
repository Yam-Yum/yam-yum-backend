import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeVideo } from './entities/recipe-video.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeProvider } from './providers/recipe.provider';
import dataSource from 'src/database/data-source';
import { FilesService } from 'src/files/files.service';
import { RecipeImageProvider } from './providers/recipe-image.provider';
import { RecipeVideoProvider } from './providers/recipe-video.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeImage, RecipeVideo])],

  controllers: [RecipeController],
  providers: [
    RecipeService,
    ...RecipeProvider,
    ...RecipeImageProvider,
    ...RecipeVideoProvider,
    { provide: 'DATA_SOURCE', useValue: dataSource },
    FilesService,
  ],
  exports: [...RecipeProvider, ...RecipeImageProvider, ...RecipeVideoProvider],
})
export class RecipeModule {}
