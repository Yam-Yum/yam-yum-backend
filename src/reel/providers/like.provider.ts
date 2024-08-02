import { DataSource } from 'typeorm';
import { Like } from '../entities/like.entity';

export const LikeProviderToken = 'LIKE_REPOSITORY';
export const LikeProvider = [
  {
    provide: LikeProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Like),
    inject: ['DATA_SOURCE'],
  },
];
