import { Module } from '@nestjs/common';
import { ChiefController } from './chief.controller';
import { ChiefService } from './chief.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Recipe } from '../recipe/entities/recipe.entity';
import { Review } from '../review/entities/review.entity';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [RecipeModule, TypeOrmModule.forFeature([User, Recipe, Review])],
  controllers: [ChiefController],
  providers: [ChiefService],
  exports: [ChiefService],
})
export class ChiefModule {}
