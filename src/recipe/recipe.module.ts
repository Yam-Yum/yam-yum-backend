import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeImage } from './entities/recipe-image.entity';
import { RecipeVideo } from './entities/recipe-video.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeProvider } from './providers/recipe.provider';
import dataSource from 'src/database/data-source';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeImage, RecipeVideo])],

  controllers: [RecipeController],
  providers: [RecipeService, ...RecipeProvider, { provide: 'DATA_SOURCE', useValue: dataSource }],
})
export class RecipeModule {}
