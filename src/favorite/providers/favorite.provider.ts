import { DataSource } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';

export const FavoriteProviderToken = 'FAVORITE_REPOSITORY';

export const FavoriteProvider = [
  {
    provide: FavoriteProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favorite),
    inject: ['DATA_SOURCE'],
  },
];
