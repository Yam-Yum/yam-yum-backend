import { Injectable } from '@nestjs/common';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import dataSource from './database/data-source';
import { FilesService } from './files/files.service';
import { UserInJWTPayload } from './shared/interfaces/JWT-payload.interface';
import { RecipeService } from './recipe/recipe.service';

@Injectable()
export class AppService {
  constructor(
    private readonly filesService: FilesService,
    private readonly recipeService: RecipeService,
  ) {}

  async getHomePage(currentUser?: UserInJWTPayload) {
    // custom banners from images randomly
    const bannerImages = await this.filesService.getMultipleFilesFromS3(
      new Array(5).fill('23ee015e69a5e8017a7acc5bde00681052e3db02032b74506faa59307d1110bd'),
    );

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
      select: ['id', 'name', 'image'],
    });

    return {
      banners: bannerImages,
      mostPopular: transformedMostPopularRecipes,
      mostRatedRecipes: transformedMostRatedRecipes,
      categories,
    };
  }
}
