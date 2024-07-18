import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export const userProviderToken = 'USER_REPOSITORY';

export const UserProvider = [
  {
    provide: userProviderToken,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
