import { FavoriteItem } from '../entities/favorite-item.entity';
import { DataSource } from 'typeorm';

export const FavoriteItemProviderToken = 'FAVORITE_ITEM_REPOSITORY';

export const FavoriteItemProvider = [
  {
    provide: FavoriteItemProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FavoriteItem),
    inject: ['DATA_SOURCE'],
  },
];
