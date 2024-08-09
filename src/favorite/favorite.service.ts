import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteItem } from './entities/favorite-item.entity';
import { Favorite } from './entities/favorite.entity';
import { FavoriteProviderToken } from './providers/favorite.provider';
import { FavoriteItemProviderToken } from './providers/favorite-item.provider';
import { userProviderToken } from 'src/users/providers/user.provider';
import { User } from 'src/users/entities/user.entity';
import { RecipeProviderToken } from 'src/recipe/providers/recipe.provider';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FavoriteService {
  constructor(
    @Inject(FavoriteProviderToken)
    private readonly _favoriteRepository: Repository<Favorite>,
    @Inject(FavoriteItemProviderToken)
    private readonly _favoriteItemRepository: Repository<FavoriteItem>,
    @Inject(userProviderToken)
    private readonly _userRepository: Repository<User>,
    @Inject(RecipeProviderToken)
    private readonly _recipeRepository: Repository<Recipe>,
    private readonly _configService: ConfigService,
  ) {}

  async toggleToFavorite(currentUserFavoriteId: string, recipeId: string) {
    try {
      const recipeExisted = await this._recipeRepository.findOne({
        where: { id: recipeId },
      });

      if (!recipeExisted) {
        throw new NotFoundException('Recipe not found');
      }

      const favoriteItemExists = await this._favoriteItemRepository.findOne({
        where: {
          favorite: { id: currentUserFavoriteId },
          recipe: { id: recipeId },
        },
      });

      if (favoriteItemExists) {
        await this._favoriteItemRepository.remove(favoriteItemExists);
        return {
          removed: true,
        };
      }

      // Create favorite item
      await this._favoriteItemRepository.save({
        recipe: recipeExisted,
        favorite: {
          id: currentUserFavoriteId,
        },
      });

      // get favorite
      const favorite = await this._favoriteRepository.findOne({
        where: {
          id: currentUserFavoriteId,
        },
        relations: {
          favoriteItems: {
            recipe: true,
          },
        },
        select: {
          favoriteItems: {
            id: true,
            recipe: {
              id: true,
              title: true,
            },
          },
        },
      });

      return {
        favoriteId: favorite.id,
        favoriteRecipes: favorite.favoriteItems.map((item) => item.recipe),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getFavoriteRecipes(favoriteId: string) {
    const favorite = await this._favoriteRepository.findOne({
      where: { id: favoriteId },
      relations: { favoriteItems: { recipe: { images: true } } },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    const favoriteWithRecipes = {
      id: favorite.id,
      recipes: [...favorite.favoriteItems.map((item) => item.recipe)],
    };

    const imagesBaseUrl = this._configService.get<string>('STORAGE_BASE_URL');
    return {
      ...favoriteWithRecipes,
      recipes: await Promise.all(
        favoriteWithRecipes.recipes.map(async (recipe) => {
          return {
            ...recipe,
            images: recipe.images.map((image) => imagesBaseUrl + image.imageName),
          };
        }),
      ),
    };
  }
}
