import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';

export const categoryProviderToken = 'CATEGORY_REPOSITORY';

export const CategoryProvider = [
  {
    provide: categoryProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
