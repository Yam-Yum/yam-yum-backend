import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RecipeVideoProviderToken } from 'src/recipe/providers/recipe-video.provider';
import { DataSource, Repository } from 'typeorm';
import { RecipeVideo } from 'src/recipe/entities/recipe-video.entity';
import { Response } from 'src/utils/response';
import { AddToFavoriteDto } from './dto/add-to-fav.dto';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { userProviderToken } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReelService {
  constructor(
    @Inject(RecipeVideoProviderToken)
    private readonly _recipeVideoRepository: Repository<RecipeVideo>,
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
    private _dataSource: DataSource,
  ) {}

  async getReels(pageNumber: number = 1, pageSize: number = 10) {
    try {
      const recipesVideo = await this._recipeVideoRepository.find({
        select: {
          id: true,
          videoName: true,
          recipe: {
            id: true,
          },
        },
        relations: {
          recipe: true,
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      return new Response('Get reels success', recipesVideo).success();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async toggleFavoriteRecipe(loggedInUserId: string, addToFavoriteDto: AddToFavoriteDto) {
    try {
      console.log(loggedInUserId);

      const { recipeId } = addToFavoriteDto;
      const userExists = await this._userRepository.findOne({
        where: { id: loggedInUserId },
        relations: ['favoriteRecipes'],
      });

      if (!userExists) {
        throw new BadRequestException('User does not exist');
      }

      const recipeExists = await this._recipeRepository.findOneBy({
        id: recipeId,
      });

      if (!recipeExists) {
        throw new BadRequestException('Recipe does not exist');
      }
      const userFavRecipeRecordExists = await this._dataSource
        .createQueryBuilder()
        .select('*')
        .from('user_favorite_recipes', 'ufr')
        .where('ufr.usersId = :userId', { userId: loggedInUserId })
        .andWhere('ufr.recipeId = :recipeId', { recipeId: recipeId })
        .getRawOne();

      if (userFavRecipeRecordExists) {
        userExists.favoriteRecipes = userExists.favoriteRecipes.filter(
          (recipe) => recipe.id !== recipeExists.id,
        );
        await this._userRepository.save(userExists);

        return new Response('Recipe Removed from favorite', userExists.favoriteRecipes).success();
      }

      userExists.favoriteRecipes.push(recipeExists);
      await this._userRepository.save(userExists);

      return new Response('Recipe added to favorite', userExists.favoriteRecipes).success();
    } catch (error) {
      console.log('🚀 ~ ReelService ~ addRecipeToFavorite ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
