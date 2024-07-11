import { DataSource } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';

export const RecipeProviderToken = 'RECIPE_REPOSITORY';

export const RecipeProvider = [
  {
    provide: RecipeProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recipe),
    inject: ['DATA_SOURCE'],
  },
];
