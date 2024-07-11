import { DataSource } from 'typeorm';
import { RecipeImage } from '../entities/recipe-image.entity';

export const RecipeImageProviderToken = 'RECIPE_IMAGE_REPOSITORY';
export const RecipeImageProvider = [
  {
    provide: RecipeImageProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipeImage),
    inject: ['DATA_SOURCE'],
  },
];
