import { DataSource } from 'typeorm';
import { RecipeVideo } from '../entities/recipe-video.entity';

export const RecipeVideoProviderToken = 'RECIPE_VIDEO_REPOSITORY';
export const RecipeVideoProvider = [
  {
    provide: RecipeVideoProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RecipeVideo),
    inject: ['DATA_SOURCE'],
  },
];
