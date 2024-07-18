import { Injectable } from '@nestjs/common';
import { Category } from './category/entities/category.entity';
import { Recipe } from './recipe/entities/recipe.entity';
import dataSource from './database/data-source';

@Injectable()
export class AppService {
  constructor() {}

  async getHomePage() {
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

    const categories = await dataSource.getRepository(Category).find({
      select: ['id', 'name', 'image'],
    });

    return {
      mostPopularRecipes,
      mostRatedRecipes,
      categories,
    };
  }
}
