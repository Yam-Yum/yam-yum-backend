import { Injectable } from '@nestjs/common';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import dataSource from './database/data-source';
import { FilesService } from './files/files.service';
import { UserInJWTPayload } from './shared/interfaces/JWT-payload.interface';
import { RecipeService } from './recipe/recipe.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly storageBaseUrl = this.configService.get('STORAGE_BASE_URL');

  constructor(
    private readonly filesService: FilesService,
    private readonly recipeService: RecipeService,
    private readonly configService: ConfigService,
  ) {}

  async getHomePage(currentUser?: UserInJWTPayload) {
    // custom banners from images randomly
    const bannerImages = [
      'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/banner1.png',
      'https://yam-yum-storage.s3.eu-north-1.amazonaws.com/banner2.png',
    ];

    // Fetch all recipes with images
    const mostPopularRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.orderCount', 'DESC')
      .take(10)
      .getMany();

    const mostRatedRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.rate', 'DESC')
      .take(10)
      .getMany();

    const transformedMostPopularRecipes = await this.recipeService.patchQuantityFavoriteToRecipes(
      currentUser,
      mostPopularRecipes,
    );
    const transformedMostRatedRecipes = await this.recipeService.patchQuantityFavoriteToRecipes(
      currentUser,
      mostRatedRecipes,
    );

    const categories = await dataSource.getRepository(Category).find({
      select: ['id', 'name', 'imageName'],
    });

    return {
      banners: bannerImages,
      mostPopular: transformedMostPopularRecipes,
      mostRatedRecipes: transformedMostRatedRecipes,
      categories: categories.map((category) => ({
        ...category,
        imageName: undefined,
        image: this.storageBaseUrl + category.imageName,
      })),
    };
  }
}
