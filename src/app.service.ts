import { Injectable } from '@nestjs/common';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import dataSource from './database/data-source';
import { FilesService } from './files/files.service';

@Injectable()
export class AppService {
  constructor(private readonly filesService: FilesService) {}

  async getHomePage() {
    // Fetch all recipes with images
    const mostPopularRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.orderCount', 'DESC')
      .take(10)
      .getMany();

    const transformedMostPopularRecipes = await Promise.all(
      mostPopularRecipes.map(async (recipe) => {
        let videoUrl;
        if (recipe.video) {
          videoUrl = await this.filesService.getFileFromS3(recipe.video.videoName);
        }

        return {
          ...recipe,
          video: videoUrl || null,
          images: await Promise.all(
            recipe.images.map(
              async (image) => await this.filesService.getFileFromS3(image.imageName),
            ),
          ),
        };
      }),
    );

    const mostRatedRecipes = await dataSource
      .getRepository(Recipe)
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.images', 'images')
      .orderBy('recipe.rate', 'DESC')
      .take(10)
      .getMany();

    const transformedMostRatedRecipes = await Promise.all(
      mostRatedRecipes.map(async (recipe) => {
        let videoUrl;
        if (recipe.video) {
          videoUrl = await this.filesService.getFileFromS3(recipe.video.videoName);
        }

        return {
          ...recipe,
          video: videoUrl || null,
          images: await Promise.all(
            recipe.images.map(
              async (image) => await this.filesService.getFileFromS3(image.imageName),
            ),
          ),
        };
      }),
    );

    const categories = await dataSource.getRepository(Category).find({
      select: ['id', 'name', 'image'],
    });

    return {
      mostPopular: transformedMostPopularRecipes,
      mostRatedRecipes: transformedMostRatedRecipes,
      categories,
    };
  }
}
